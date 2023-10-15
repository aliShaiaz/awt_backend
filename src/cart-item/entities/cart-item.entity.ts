import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity'; // Import the Cart entity here
import { Product } from 'src/product/entities/product.entity'; // Import the Product entity here

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  cart_item_id: number;

  @ManyToOne(() => Cart, cart => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
