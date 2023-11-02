import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';

@Entity()
export class OrderTracking {
  @PrimaryGeneratedColumn()
  trackingId: number;

  @ManyToOne(() => Order, (order) => order.orderTrackings)
  order: Order;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orderTrackings)
  orderStatus: OrderStatus;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
