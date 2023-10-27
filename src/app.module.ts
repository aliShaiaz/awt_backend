import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/admin.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
// import { RouterModule } from '@nestjs/core';
// import { ConfigModule } from '@nestjs/config';
// import path from 'path';



@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot(config),
    // RouterModule.register([
    //   {
    //     path: 'admin',
    //     module: AdminModule
    //   }
    //   // 4 object should be register here 
      
    // ]),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    ],
    controllers: [],
  providers: [],
  
})
export class AppModule {}
