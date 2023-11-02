import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity'; // Adjust the import path
import { OrderItem } from 'src/order-item/entities/order-item.entity'; // Adjust the import path
import { OrderTracking } from 'src/order-tracking/entities/order-tracking.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'OrderId' })
  orderId: number;

  @Column({ type: 'date', name: 'CreatedAt' })
  createdAt: Date;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  @JoinColumn({ name: 'BuyerId' })
  buyer: Buyer;


  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'TotalPrice' })
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];


  @OneToMany(() => OrderTracking, (orderTrackings) => orderTrackings.order)
  orderTrackings: OrderTracking[];
}
