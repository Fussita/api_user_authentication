
import { IService, Result, ExceptionMapper } from 'src/_core'
import { IServiceDecorator } from '../../service'

export class ExceptionDecorator<L, R> extends IServiceDecorator<L, R>{
    constructor ( 
        service: IService<L, R>,
    ) {
        super(service)
    }
    async execute(data: L): Promise<Result<R>> {
        try {
            return await this.service.execute(data)    
        } catch (e) {
            throw ExceptionMapper.formatException(e)
        }
    }
}
