import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { Seller } from './entities/seller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product/product.entity';
import { Order } from './entities/order.entity';
import { AvailableQuality } from './entities/product/availableQuality.entity';
import { Specification } from './entities/product/specificaiton.entity';
import { Review } from './entities/product/review/review.entity';
import { Repository } from 'typeorm';
import { ReviewReply } from './entities/product/review/reviewReply.entity';
import { Category } from './entities/product/category.entity';
import { Brand } from './entities/product/brand.entity';
import { Buyer } from './entities/buyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seller,Buyer, Order, Product, Category, Brand, AvailableQuality, Specification, Review, ReviewReply])],
  controllers: [SellerController],
  providers: [SellerService, Repository],
})
export class SellerModule {}
