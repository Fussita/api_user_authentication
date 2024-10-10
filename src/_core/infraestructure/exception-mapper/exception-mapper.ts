import { HttpException, HttpStatus } from "@nestjs/common";
import { EmailNotRegisteredException } from "src/auth/application/exception/email-not-registered-exception";
import { EmailRegisteredException } from "src/auth/application/exception/email-registered-exception";
import { IncorrectPasswordException } from "src/auth/application/exception/incorrect-password-registered-exception";

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