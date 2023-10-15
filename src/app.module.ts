import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // Modules should be register here
    BuyerModule,
    //.
    //.
    RouterModule.register([
      // 4 object should be register here 
      
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BuyerModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CartModule,
    CartItemModule,
    ],
  providers: [],
  
})
export class AppModule {}

/*
it should be like this ...............
@Module({
    imports: [
    TypeOrmModule.forRoot(config),
    SellerModule, 
        BuyerModule,
        RouterModule.register([
      {
        path:'api/seller', 
        module : SellerModule
      },
      {
        path:'api/buyer',
        module : BuyerModule
      }
    ]),
    ConfigModule.forRoot({ //for env variable
      isGlobal:true
    }),
    
  ],
  providers: [],
  
})
*/