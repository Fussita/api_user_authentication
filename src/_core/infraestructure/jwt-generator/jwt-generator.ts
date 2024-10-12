import { JwtService } from "@nestjs/jwt";
import { IJWTGenerator } from "src/_core";

export class JWTGenerator implements IJWTGenerator {
    constructor(
        private readonly jwtService: JwtService
    ) {}
    
    generateJwt(param: string): string {
        return this.jwtService.sign( { id: param } )
    }
}