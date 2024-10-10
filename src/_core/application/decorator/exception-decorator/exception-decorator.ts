import { Result } from "src/_core/utils/result-handler/Result"
import { ServiceDecorator } from "../../service/decorator/application-service-decorator.decorator"
import { IService } from "../../service/service.interface"
import { ExceptionMapper } from "src/_core/infraestructure/exception-mapper/exception-mapper"

export class ExceptionDecorator<L, R> extends ServiceDecorator<L, R>{
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
