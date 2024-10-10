import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { IService } from "src/_core/application/service/service.interface";
import { Result } from "src/_core/utils/result-handler/Result";
import { IAccountRepository } from "src/account/application/repository-interface/account-repository.interface";
import { SignUpEntry } from "./dto/sign-up-entry-dto";
import { SignUpResponse } from "./dto/sign-up-response-dto";
import { IdGenerator } from "src/_core/application/id-generator/id-generator.interface";
import { EmailRegisteredException } from "../../exception/email-registered-exception";

export class SignUpService implements IService<SignUpEntry, SignUpResponse> {

    constructor(
        private readonly accountRepo: IAccountRepository,
        private readonly encryptor: IEncryptor,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(data: SignUpEntry): Promise<Result<SignUpResponse>> {
        const exists = await this.accountRepo.findByEmail(data.email)
        if (exists.isSuccess()) return Result.fail( EmailRegisteredException.create() )
        const cipherPassword = await this.encryptor.hash(data.password)
        const result = await this.accountRepo.saveAccount({
            id: this.idGen.generate(),
            email: data.email,
            password: cipherPassword,
            twoFA: false,
            sessions: []
        })
        if (!result.isSuccess()) return Result.fail(result.Error)
        return Result.success({
            id: result.Value.id
        })
    }

}