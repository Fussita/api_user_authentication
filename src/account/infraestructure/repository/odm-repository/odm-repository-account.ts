import { Result } from "src/_core";
import { Model, Mongoose } from "mongoose";
import { AccountModel } from "src/account/application/entity-model/account-model.interface";
import { IAccountRepository } from "src/account/application/repository-interface/account-repository.interface";
import { OdmAccount, OdmAccountSchema } from "../../entity/odm-account.entity";

export class OdmAccountRepository implements IAccountRepository {
    
    private readonly model: Model<OdmAccount>;

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmAccount>('OdmAccount', OdmAccountSchema)
    }

    async findByEmail(email: string): Promise<Result<AccountModel>> {
        const odm = await this.model.findOne( { email: email } )
        if ( !odm ) return Result.fail(new Error('Account not found'))
        return Result.success( odm )
    }

    async saveAccount(entry: AccountModel): Promise<Result<AccountModel>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
            return Result.success( odm )
        } catch (e) {
            return Result.fail( new Error('') )
        }
    }

    async findById(id: string): Promise<Result<AccountModel>> {
        const odm = await this.model.findOne( { id: id } )
        if ( !odm ) return Result.fail(new Error('Account not found'))
        return Result.success( odm )
    }

}