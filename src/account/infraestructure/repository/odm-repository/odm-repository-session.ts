import { Model, Mongoose } from "mongoose";
import { Result } from "src/_core";
import { ISessionRepository, SessionModel } from "src/account/application";
import { OdmSession, OdmSessionSchema } from "../../entity";

export class OdmSessionRepository implements ISessionRepository {
    
    private readonly model: Model<OdmSession>;

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmSession>('OdmSession', OdmSessionSchema)
    }

    async deleteSession(id: string): Promise<Result<string>> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Result<SessionModel>> {
        const odm = await this.model.findOne( { id: id } )
        if ( !odm ) return Result.fail( new Error('Session not found') )
        return Result.success( odm )
    }

    async saveSession(entry: SessionModel): Promise<Result<SessionModel>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
            return Result.success( odm )
        } catch (e) {
            return Result.fail( new Error('') )
        }
    }

    updateSession(entry: SessionModel): Promise<Result<SessionModel>> {
        throw new Error("Method not implemented.");
    }

    findActiveSessionsByUserId(id: string): Promise<Result<SessionModel[]>> {
        throw new Error("Method not implemented.");
    }

}