import { Module } from '@nestjs/common';
// import { MessageService } from './mess.age.s.ervice.nonRelational';
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
import { MessageService } from './message.service';
import { AvailableQuality } from 'src/seller/entities/product/availableQuality.entity';
import { Specification } from 'src/seller/entities/product/specificaiton.entity';
import { Review } from 'src/seller/entities/product/review/review.entity';
import { ReviewReply } from 'src/seller/entities/product/review/reviewReply.entity';
import { Buyer } from 'src/seller/entities/buyer.entity';
import { SellerAuthService } from 'src/seller-auth/seller-auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  // AvailableQuality er  kahini ta bujhlam na 
  imports: [TypeOrmModule.forFeature([Message, Conversation, Seller, Order, Product, AvailableQuality, Specification, Review,ReviewReply,Buyer ]), SellerModule /*SellerModule*/],
  controllers: [MessageController],
  providers: [MessageService, SellerService, Repository, SellerAuthService, JwtService ],
})
export class MessageModule {}
