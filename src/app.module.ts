import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';


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
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ReviewModule } from './review/review.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { OrderTrackingModule } from './order-tracking/order-tracking.module';
import { NotificationModule } from './notification/notification.module';
import { CurrentBuyerMiddleware } from './utility/middlewares/current-buyer.middleware';


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
    OrderModule,
    OrderItemModule,
    ReviewModule,
    OrderStatusModule,
    OrderTrackingModule,
    NotificationModule,
    
    ],
  providers: [],
  
})
export class AppModule {
  configure ( consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentBuyerMiddleware)
      .exclude(
        { path: 'buyer/login', method: RequestMethod.ALL },
        { path: 'buyer/signup', method: RequestMethod.ALL },
        { path: 'product', method: RequestMethod.ALL }
      )
      // .forRoutes({ path: '*', method: RequestMethod.ALL})
  }
}
