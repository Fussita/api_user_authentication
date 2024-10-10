import { Body, Controller, Get, Inject, Ip, Post, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { BcryptEncryptor } from "src/_core/infraestructure/encryptor/bcrypt-encryptor";
import { JWTAuthGuard } from "src/_core/infraestructure/jwt/decorator/jwt-auth.guard";
import { IAccountRepository } from "src/account/application/repository-interface/account-repository.interface";
import { ISessionRepository } from "src/account/application/repository-interface/session-repository.interface";
import { OdmAccountRepository } from "src/account/infraestructure/repository/odm-repository/odm-repository-account";
import { OdmSessionRepository } from "src/account/infraestructure/repository/odm-repository/odm-repository-session";
import { SignInService } from "src/auth/application/service/sign-in/sign-in-service.application";
import { SignUpService } from "src/auth/application/service/sign-up/sign-up-service.application";
import { SignInEntryController } from "./dto/sign-in/sign-in-entry-dto";
import { SignUpEntryController } from "./dto/sign-up/sign-up-entry-dto";
import { GetSession } from "src/_core/infraestructure/jwt/decorator/get-session.param.decorator";
import { SessionModel } from "src/account/application/entity-model/session-model.interface";
import { IdGenerator } from "src/_core/application/id-generator/id-generator.interface";
import { UuidGenerator } from "src/_core/infraestructure/id-generator/uuid-generator";
import { JwtGenerator } from "src/_core/infraestructure/jwt/jwt-generator";
import { IJwtGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";
import { JwtService } from "@nestjs/jwt";
import { IDateHandler } from "src/_core/application/date-handler/date-handler.interface";
import { ErrorParseDecorator } from "src/_core/application/decorator/error-parse-decorator/error-parse-decorator";
import { MomentDateHandler } from "src/_core/infraestructure/date-handler/moment-date-handler";

@Controller('auth')
export class AuthController {
    
    private readonly accountRepo: IAccountRepository
    private readonly sessionRepo: ISessionRepository
    private readonly encryptor: IEncryptor
    private readonly idGen: IdGenerator
    private readonly jwtGen: IJwtGenerator
    private readonly dateHandler: IDateHandler

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
        jwtService: JwtService
    ) {
        this.sessionRepo = new OdmSessionRepository(mongo)
        this.accountRepo = new OdmAccountRepository(mongo)
        this.encryptor = new BcryptEncryptor()
        this.idGen = new UuidGenerator()
        this.jwtGen = new JwtGenerator( jwtService )
        this.dateHandler = new MomentDateHandler()
    }
    
    @Post('sign-in')
    async signInUser( @Body() entry: SignInEntryController, @Ip() ip: string ) {
        const service = 
            new ErrorParseDecorator(
                new SignInService(
                    this.accountRepo,
                    this.sessionRepo,
                    this.encryptor,
                    this.jwtGen,
                    this.idGen,
                    this.dateHandler
                ),    
            )
        return (await service.execute({ ...entry, ip_address: '' })).Value
    }

    @Post('sign-up')
    async signUpUser( @Body() entry: SignUpEntryController ) {
        const service = 
            new ErrorParseDecorator(
                new SignUpService(
                    this.accountRepo,
                    this.encryptor,
                    this.idGen
                ),
            )
        return (await service.execute({ ...entry })).Value
    }
    
    @Get('verify-token')
    @UseGuards( JWTAuthGuard )
    async verifyToken( @GetSession() session: SessionModel ) {}
    
    @Get('log-out')
    @UseGuards( JWTAuthGuard )
    async logOut( @GetSession() session: SessionModel ) {
        return (await this.sessionRepo.deleteSession( session.id )).Value
    }
}