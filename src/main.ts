import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'Buyer-hbfhbsdahfbJHBHBB67665765UVGHV76ygyuv',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(cookieParser('Cart-jiodfhiuasdtrfw4789idfb87w4b'));

  await app.listen(3000);
}

bootstrap();
