import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity'; // Adjust the import path
import { Product } from 'src/product/entities/product.entity'; // Adjust the import path

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
}
