import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { OrderStatus } from './entities/order-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService]
})
export class OrderStatusModule {}
