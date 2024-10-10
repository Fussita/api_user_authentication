import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './_config/env';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true
    }
  ))

  await app.listen(envs.port);
  logger.log(`Application running on the port: ${envs.port}`)

}
bootstrap();
