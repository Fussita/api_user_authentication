import { Result } from "../../../utils/result-handler/Result"
import { IService } from "../service.interface"

export abstract class ServiceDecorator<D, R> implements IService<D, R> {
    protected service: IService<D, R>
    
    constructor ( service: IService<D, R> ) {
        this.service = service
    }

    execute ( data: D ): Promise<Result<R>> {
        return this.service.execute( data )
    }

}