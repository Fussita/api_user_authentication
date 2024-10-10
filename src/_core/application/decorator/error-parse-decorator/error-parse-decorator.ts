import { Result, IService, ExceptionMapper } from "src/_core"
import { IServiceDecorator } from '../../service'

export class ErrorParseDecorator<L, R> extends IServiceDecorator<L, R>{
    constructor ( 
        service: IService<L, R>
    ) {
        super(service)
    }
    async execute(data: L): Promise<Result<R>> {
        const response = await this.service.execute(data)
        if (!response.isSuccess()) throw ExceptionMapper.formatException(response.Error)
        return response    
    }
}
