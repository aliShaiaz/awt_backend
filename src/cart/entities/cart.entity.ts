import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { Buyer } from 'src/buyer/entities/buyer.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @ManyToOne(() => Buyer)
  @JoinColumn({ name: 'BuyerId' })
  buyer: Buyer;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
