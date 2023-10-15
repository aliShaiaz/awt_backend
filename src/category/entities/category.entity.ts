import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column()
  Name: string;

  @OneToMany(() => Product, (product) => product.Category)
  products: Product[];
}
