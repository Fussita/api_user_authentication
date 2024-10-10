import { Result } from "../../utils/result-handler/Result"

export interface IService<D, R> {
    execute ( data: D ): Promise<Result<R>>
}