import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createCart(buyerInfo: string, productId: number): Promise<Cart> {
    // Find the Buyer and Product entities based on the provided information
    const buyer = await this.buyerRepository.findOne({ where: { buyerEmail: buyerInfo } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!buyer) {
      // Handle the case where the buyer is not found (e.g., return an error)
      throw new Error('Buyer not found');
    }

    if (!product) {
      // Handle the case where the product is not found (e.g., return an error)
      throw new Error('Product not found');
    }

    // Create a new Cart entity
    const cart = new Cart();
    cart.buyer = buyer;
    cart.product = product;

    return this.cartRepository.save(cart);
  }


  //-----------------------------------------------------------------------

  async showAllCart(): Promise<Cart[]> {
    const cartItems = await this.cartRepository.find({
      relations: ['buyer', 'product'],
    });
  
    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('No products found in the cart');
    }
  
    // Remove sensitive information before returning the result
    cartItems.forEach(cartItem => {
      if (cartItem.buyer) {
        delete cartItem.buyer.buyerPassword;
      }
    });
  
    return cartItems;
  }

  //-----------------------------------------------------------------------

  deleteCart(productId: number){
    return this.cartRepository.delete(productId);
  }
}
