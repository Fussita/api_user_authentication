import { Result } from "src/_core"
import { SessionModel } from ".."

export interface ISessionRepository {
  saveSession(entry: SessionModel): Promise<Result<SessionModel>>
  updateSession(entry: SessionModel): Promise<Result<SessionModel>>
  deleteSession(id: string): Promise<Result<string>>
  findActiveSessionsByUserId(id: string): Promise<Result<SessionModel[]>> 
  findById(id: string): Promise<Result<SessionModel>>

}
