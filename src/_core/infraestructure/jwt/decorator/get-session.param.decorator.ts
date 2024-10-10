import { ExecutionContext, createParamDecorator } from "@nestjs/common"

export const GetSession = createParamDecorator(
    (_data, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        if (!request.session) throw new Error(' 404 session not found')
        return request.session
    }
)