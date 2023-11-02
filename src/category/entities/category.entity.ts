import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
