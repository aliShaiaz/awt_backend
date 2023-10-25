import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SellerModule } from './seller/seller.module';
import { MessageModule } from './message/message.module';
import { ProductSortingModule } from './product-sorting/product-sorting.module';
import { SellerAuthModule } from './seller-auth/seller-auth.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // Modules should be register here
    SellerModule,
    MessageModule,
    ProductSortingModule,
    RouterModule.register([
      // 4 object should be register here 
      
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SellerAuthModule,
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'mohammad.sheakh@gmail.com',
      pass: process.env.App_Generated_Password // app generated password 
      },
      }
      })
      
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