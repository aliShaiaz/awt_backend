import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  Price: number;

  @ManyToOne(() => Category, (category) => category.products)
  Category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  Brand: Brand;
}
