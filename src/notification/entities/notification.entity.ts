import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @ManyToOne(() => Buyer, (buyer) => buyer.notifications)
  buyer: Buyer;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
