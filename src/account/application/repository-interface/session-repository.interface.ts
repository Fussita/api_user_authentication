import { Result } from "src/_core/utils/result-handler/Result"
import { SessionModel } from "../entity-model/session-model.interface"

export interface ISessionRepository {
  saveSession(entry: SessionModel): Promise<Result<SessionModel>>
  updateSession(entry: SessionModel): Promise<Result<SessionModel>>
  deleteSession(id: string): Promise<Result<string>>
  findActiveSessionsByUserId(id: string): Promise<Result<SessionModel[]>> 
  findById(id: string): Promise<Result<SessionModel>>

}
