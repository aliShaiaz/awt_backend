import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import session from 'express-session';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Session() session) {
    const buyerEmail = session.buyerEmail;
    return this.orderService.createOrder(createOrderDto, buyerEmail);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  
}
