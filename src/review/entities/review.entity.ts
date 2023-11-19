import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @ManyToOne(() => Buyer, (buyer) => buyer.reviews)
  buyer: Buyer;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @Column({ type: 'text' })
  reviewText: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];
}
