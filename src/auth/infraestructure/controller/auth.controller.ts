import { Body, Controller, Get, Inject, Ip, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Mongoose } from "mongoose";
import { BcryptEncryptor, ErrorParseDecorator, IDateHandler, IdGenerator, IEncryptor, IJWTGenerator, MomentDateHandler, UUIDGenerator } from 'src/_core'
import { SignInService } from "src/auth/application/service/sign-in/sign-in-service.application";
import { SignUpService } from "src/auth/application/service/sign-up/sign-up-service.application";
import { SignInEntryController } from "./dto/sign-in/sign-in-entry-dto";
import { SignUpEntryController } from "./dto/sign-up/sign-up-entry-dto";
import { SessionModel } from "src/account/application/entity-model/session-model.interface";
import { IAccountRepository } from "src/account/application/repository-interface/account-repository.interface";
import { ISessionRepository } from "src/account/application/repository-interface/session-repository.interface";
import { OdmAccountRepository } from "src/account/infraestructure/repository/odm-repository/odm-repository-account";
import { OdmSessionRepository } from "src/account/infraestructure/repository/odm-repository/odm-repository-session";
import { JWTGenerator } from "src/_core/infraestructure/jwt-generator";
import { GetSession } from "../jwt/decorator/get-session.param.decorator";
import { JWTAuthGuard } from "../jwt/guard/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    
    private readonly accountRepo: IAccountRepository
    private readonly sessionRepo: ISessionRepository
    private readonly encryptor: IEncryptor
    private readonly idGen: IdGenerator
    private readonly jwtGen: IJWTGenerator
    private readonly dateHandler: IDateHandler

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
        jwtService: JwtService
    ) {
        this.sessionRepo = new OdmSessionRepository(mongo)
        this.accountRepo = new OdmAccountRepository(mongo)
        this.encryptor = new BcryptEncryptor()
        this.idGen = new UUIDGenerator()
        this.jwtGen = new JWTGenerator( jwtService )
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