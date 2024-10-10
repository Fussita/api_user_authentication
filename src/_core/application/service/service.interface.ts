import { Result } from "src/_core";

export interface IService<D, R> {
    execute ( data: D ): Promise<Result<R>>
}