import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemController],
  providers: [CartItemService]
})
export class CartItemModule {}
