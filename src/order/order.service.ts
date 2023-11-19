import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Buyer) private buyerRepository: Repository<Buyer>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, buyerEmail: string) {
    const buyer = await this.buyerRepository.findOne({ where: { buyerEmail } });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    const cart = await this.cartRepository.find({
      where: { buyer: { id: buyer.id } },
      relations: ['product'], // Ensure 'product' is loaded with cart items
    });


    if (!cart || cart.length === 0) {
      throw new NotFoundException('Cart not found');
    }

    for (const cartItem of cart) {
      const product = cartItem.product;

      if (!product) {
        console.error(`Product not found for cart item with id ${cartItem.cartId}`);
        continue;
      }

      const order = new Order();
      order.buyer = buyer;
      order.products = [product];
      order.totalPrice = product.product_price;
      order.quantity = 1;
      order.status_name = 'pending';
      order.createdAt = new Date();
      await this.orderRepository.save(order);
      await this.cartRepository.remove(cartItem);
    }

    return { message: 'Order created successfully' };
  }

  //--------------------------------------------

  async findAll() {
    return this.orderRepository.find();
  }
}
