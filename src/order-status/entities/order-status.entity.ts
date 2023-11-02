import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column()
  status_name: string;
  orderTrackings: any;
}
