import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './entities/buyer.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'sadmanurshishir1290@gmail.com',
        pass: 'cgsm dyxs gfzw pqzo',
      }
    }
  }),],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
