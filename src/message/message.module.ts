import { Module } from '@nestjs/common';
import { MessageService } from './message.service.nonRelational';
import { MessageController } from './message.controller';
import { SellerService } from 'src/seller/seller.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation]), SellerModule /*SellerModule*/],
  controllers: [MessageController],
  providers: [MessageService, SellerService, Repository],
})
export class MessageModule {}
