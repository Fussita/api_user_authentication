import { Result } from "src/_core/utils/result-handler/Result"
import { AccountModel } from "../entity-model/account-model.interface"

export interface IAccountRepository {
  saveAccount(entry: AccountModel): Promise<Result<AccountModel>>
  findById(id: string): Promise<Result<AccountModel>>
  findByEmail(email: string): Promise<Result<AccountModel>>
}

