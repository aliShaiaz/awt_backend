import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTrackingService } from './order-tracking.service';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';

@Controller('order-tracking')
export class OrderTrackingController {
  constructor(private readonly orderTrackingService: OrderTrackingService) {}

  @Post()
  create(@Body() createOrderTrackingDto: CreateOrderTrackingDto) {
    return this.orderTrackingService.create(createOrderTrackingDto);
  }

  @Get()
  findAll() {
    return this.orderTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTrackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTrackingDto: UpdateOrderTrackingDto) {
    return this.orderTrackingService.update(+id, updateOrderTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTrackingService.remove(+id);
  }
}
