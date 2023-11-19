import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ type: 'date', name: 'CreatedAt' })
  createdAt: Date;

  @ManyToOne(() => Buyer)
  @JoinColumn({ name: 'BuyerId' })
  buyer: Buyer;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'TotalPrice' })
  totalPrice: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  status_name: string;
}
