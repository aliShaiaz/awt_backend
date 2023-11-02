import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';


// import * as dotenv from 'dotenv';
async function bootstrap() {
  // dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'Buyer-hbfhbsdahfbJHBHBB67665765UVGHV76ygyuv',
      resave: false,
      saveUninitialized: false,
      
    }),
    );

  await app.listen(3000);
  
}
bootstrap();
