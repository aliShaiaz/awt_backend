import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SellerService } from 'src/seller/seller.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, SellerService],
})
export class MessageModule {}
