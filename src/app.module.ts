import { Module } from '@nestjs/common';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './_core/infraestructure/provider/mongoose-db-provider';
import { envs } from './_config/env';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.JWT_SECRET_KEY,
      signOptions: { expiresIn: '168h' }
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
