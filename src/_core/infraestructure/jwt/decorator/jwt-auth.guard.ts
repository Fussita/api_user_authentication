import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { ISessionRepository } from "src/account/application/repository-interface/session-repository.interface";
import { Mongoose } from "mongoose";
import { SessionModel } from "src/account/application/entity-model/session-model.interface";
import { Result } from "src/_core/utils/result-handler/Result";
import { OdmSessionRepository } from "src/account/infraestructure/repository/odm-repository/odm-repository-session";
import { envs } from "src/_config/env";

@Injectable()
export class JWTAuthGuard implements CanActivate {

    private readonly sessionRepository: ISessionRepository

    constructor(
        private jwtService: JwtService,
        @Inject('NoSQL') noSQL: Mongoose
    ) {
        this.sessionRepository = new OdmSessionRepository(noSQL)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()       
        if ( !request.headers['authorization'] ) throw new UnauthorizedException() 
        const [type, token] = request.headers['authorization'].split(' ') ?? []
        if ( type != 'Bearer' || !token ) throw new UnauthorizedException()                       
        try {
            const payload = await this.jwtService.verifyAsync( token, { secret: envs.JWT_SECRET_KEY } )
            const sessionData = await this.validate( payload )
            request['session'] = sessionData
        } catch { throw new UnauthorizedException() }
        return true
    }
    
    private async validate(payload: JwtPayload) {
        const session: Result<SessionModel> = await this.sessionRepository.findById( payload.id ); 
        if ( !session.isSuccess() ) throw new Error('Error buscando la sesion del usuario a traves del token')
        return session.Value;
    }
}