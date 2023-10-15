import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CartItem } from 'src/cart-item/entities/cart-item.entity'; // Import the CartItem entity here
import { Buyer } from 'src/buyer/entities/buyer.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne(() => Buyer)
  @JoinColumn({ name: 'buyer_id' })
  buyer: Buyer;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[];
}
