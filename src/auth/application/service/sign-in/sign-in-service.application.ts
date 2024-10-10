import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { IService } from "src/_core/application/service/service.interface";
import { Result } from "src/_core/utils/result-handler/Result";
import { IAccountRepository } from "src/account/application/repository-interface/account-repository.interface";
import { SignInEntry } from "./dto/sign-in-entry-dto";
import { SignInResponse } from "./dto/sign-in-response-dto";
import { ISessionRepository } from "src/account/application/repository-interface/session-repository.interface";
import { IJwtGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";
import { IdGenerator } from "src/_core/application/id-generator/id-generator.interface";
import { IDateHandler } from "src/_core/application/date-handler/date-handler.interface";
import { IncorrectPasswordException } from "../../exception/incorrect-password-registered-exception";
import { EmailNotRegisteredException } from "../../exception/email-not-registered-exception";

export class SignInService implements IService<SignInEntry, SignInResponse> {

    constructor(
        private readonly accountRepo: IAccountRepository,
        private readonly sessionRepo: ISessionRepository,
        private readonly encryptor: IEncryptor,
        private readonly jwtGen: IJwtGenerator,
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