import { JwtService } from "@nestjs/jwt";
import { IJwtGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";

export class JwtGenerator implements IJwtGenerator {
    constructor(
        private readonly jwtService: JwtService
    ) {}
    
    generateJwt(param: string): string {
        return this.jwtService.sign( { id: param } )
    }
}