import { Module } from '@nestjs/common';
import { OrderTrackingService } from './order-tracking.service';
import { OrderTrackingController } from './order-tracking.controller';
import { OrderTracking } from './entities/order-tracking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTracking])],
  controllers: [OrderTrackingController],
  providers: [OrderTrackingService]
})
export class OrderTrackingModule {}
