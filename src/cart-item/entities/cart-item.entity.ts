import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemId: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'CartId' })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @Column()
  quantity: number;
}
