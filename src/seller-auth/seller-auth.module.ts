import { Module } from '@nestjs/common';
import { SellerAuthService } from './seller-auth.service';
import { SellerService } from 'src/seller/seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from 'src/seller/entities/seller.entity';
import { Order } from 'src/seller/entities/order.entity';
import { Product } from 'src/seller/entities/product/product.entity';
import { AvailableQuality } from 'src/seller/entities/product/availableQuality.entity';
import { Specification } from 'src/seller/entities/product/specificaiton.entity';
import { Review } from 'src/seller/entities/product/review/review.entity';
import { ReviewReply } from 'src/seller/entities/product/review/reviewReply.entity';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constant';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  providers: [SellerAuthService, LocalStrategy, JwtStrategy], //🔴🔴 , SellerService
  imports: [PassportModule, JwtModule.register(
    {
      secret : "SECRET",
      signOptions: { expiresIn: '60s' },
    }
  ) ,TypeOrmModule.forFeature([Seller, Order, Product, AvailableQuality, Specification, Review, ReviewReply])],
})
export class SellerAuthModule {}
