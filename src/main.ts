import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const configServer = config.get('server');
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  const PORT = process.env.PORT || configServer.port;
  await app.listen(PORT);
  logger.log(`Application running at PORT ${PORT}`);
}
bootstrap();
