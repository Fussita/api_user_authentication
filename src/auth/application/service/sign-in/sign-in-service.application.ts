import { IDateHandler, IdGenerator, IEncryptor, IJWTGenerator, IService, Result } from 'src/_core'
import { EmailNotRegisteredException, IncorrectPasswordException } from '../../exception'
import { SignInEntry } from './dto/sign-in-entry-dto'
import { SignInResponse } from './dto/sign-in-response-dto'
import { IAccountRepository } from 'src/account/application/repository-interface/account-repository.interface'
import { ISessionRepository } from 'src/account/application/repository-interface/session-repository.interface'

export class SignInService implements IService<SignInEntry, SignInResponse> {

    constructor(
        private readonly accountRepo: IAccountRepository,
        private readonly sessionRepo: ISessionRepository,
        private readonly encryptor: IEncryptor,
        private readonly jwtGen: IJWTGenerator,
        private readonly idGen: IdGenerator,
        private readonly date: IDateHandler
    ) {}

    async execute(data: SignInEntry): Promise<Result<SignInResponse>> {
        const exists = await this.accountRepo.findByEmail(data.email)
        if (!exists.isSuccess()) return Result.fail( EmailNotRegisteredException.create() )
        const account = exists.Value
        const compareResult = await this.encryptor.compareHash(data.password, account.password)
        if (!compareResult) return Result.fail( IncorrectPasswordException.create() )
        const sessId = this.idGen.generate()
        const sessionResult = await this.sessionRepo.saveSession({
            id: sessId,
            expired_at: this.date.getExpiry(),
            push_token: data.push_token,
            ip_address: data.ip_address
        })
        if (!sessionResult.isSuccess()) return Result.fail( sessionResult.Error )
        return Result.success({
            token: this.jwtGen.generateJwt(sessId) 
        })
    }

}