import { Module } from '@nestjs/common';
import { MessageService } from './mess.age.s.ervice.nonRelational';
import { MessageController } from './message.controller';
import { SellerService } from 'src/seller/seller.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { SellerModule } from 'src/seller/seller.module';
import { Seller } from 'src/seller/entities/seller.entity';
import { Order } from 'src/seller/entities/order.entity';
import { Product } from 'src/seller/entities/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation, Seller, Order, Product]), SellerModule /*SellerModule*/],
  controllers: [MessageController],
  providers: [MessageService, SellerService, Repository],
})
export class MessageModule {}
