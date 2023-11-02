import { Injectable } from '@nestjs/common';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';

@Injectable()
export class OrderTrackingService {
  create(createOrderTrackingDto: CreateOrderTrackingDto) {
    return 'This action adds a new orderTracking';
  }

  findAll() {
    return `This action returns all orderTracking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderTracking`;
  }

  update(id: number, updateOrderTrackingDto: UpdateOrderTrackingDto) {
    return `This action updates a #${id} orderTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTracking`;
  }
}
