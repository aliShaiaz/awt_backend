import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'OrderItemId' })
  orderItemId: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'OrderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
