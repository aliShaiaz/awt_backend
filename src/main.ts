import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
async function bootstrap() {
  // dotenv.config();
  const app = await NestFactory.create(AppModule);
 
  
  app.use(cookieParser(),cors());
  app.enableCors();
  await app.listen(3000);
  
}
bootstrap();
