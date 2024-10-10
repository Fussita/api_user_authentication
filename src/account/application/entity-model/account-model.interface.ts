import { SessionModel } from "./session-model.interface"

export interface AccountModel {
    id: string
    email: string
    password: string
    twoFA: boolean
    sessions: SessionModel[]  
}