import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      transform: true, // DTO 타입으로 자동 변환
      transformOptions: {
        enableImplicitConversion: true, // 암시적 변환 ( ex: "10"을 number로 변환 )
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
