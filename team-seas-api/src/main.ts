import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefixs = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefixs);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3333;
  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
