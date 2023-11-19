import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @ManyToOne(() => Buyer)
  @JoinColumn({ name: 'BuyerId' })
  buyer: Buyer;

  // @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  // cartItems: CartItem[];

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductId' })
  product: Product;
}
