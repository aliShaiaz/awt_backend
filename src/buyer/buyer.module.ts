import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './entities/buyer.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { CreditCartEntity } from './entities/credit-card.entity';
import { CreditCardController } from './creditcard.controller';
import { CreditCardService } from './creditcard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer,CreditCartEntity]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'ghoreghore.customer.info@gmail.com',
        pass: 'zpur hffp fwlc vmxu',
      }
    }
  }),],
  controllers: [BuyerController, CreditCardController],
  providers: [BuyerService, CreditCardService],
})
export class BuyerModule {}
