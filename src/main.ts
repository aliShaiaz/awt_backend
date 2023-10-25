import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
// import * as dotenv from 'dotenv';
async function bootstrap() {
  // dotenv.config();

  const app = await NestFactory.create(AppModule);

  // app.use(
  //   session({
  //   secret: 'my-secret',
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie:{
  //   maxAge: 300000
  //   }
  //   }),
  //   );
    
  await app.listen(3000);
  
}
bootstrap();
