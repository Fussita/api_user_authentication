import { SessionModel } from ".."

export interface AccountModel {
    id: string
    email: string
    password: string
    twoFA: boolean
    sessions: SessionModel[]  
}