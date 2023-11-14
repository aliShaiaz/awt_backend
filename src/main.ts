import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import session from 'express-session';
const express = require('express');
const session = require('express-session');
// import * as dotenv from 'dotenv';
async function bootstrap() {
  // dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
      
  //   }),
  // );

  app.use(
    session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1800000, // 30 minutes
    }
    }),
    );
    
  await app.listen(3000);

}
bootstrap();
