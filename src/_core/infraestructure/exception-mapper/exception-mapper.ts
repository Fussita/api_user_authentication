import { HttpException, HttpStatus } from "@nestjs/common";
import { EmailNotRegisteredException, EmailRegisteredException, IncorrectPasswordException } from "src/auth/application/exception";

export class ExceptionMapper {
  
  static formatException(error: Error): Error {
    switch (error.constructor) {

      case (EmailNotRegisteredException): return new HttpException(error.message, 410);
      case (EmailRegisteredException): return new HttpException(error.message, 410);
      case (IncorrectPasswordException): return new HttpException(error.message, 410);

      default: return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }
}