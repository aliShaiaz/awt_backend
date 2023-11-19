import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

@Entity()
export class Product {
  reduce(arg0: (acc: any, product: any) => any, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column()
  product_price: number;

  @Column()
  product_image: string;

  @ManyToOne(() => Category, (category) => category.products, {cascade : true})
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products, {cascade : true})
  brand: Brand;

  @Column('float') // Specify the data type as 'float' for product_rating
  product_rating: number;

  @Column()
  quantity: number;

  @Column('json', { nullable: true }) // For reviews, use 'json' data type (nullable if needed)
  reviews: any;

  @Column('json', { nullable: true }) // For orderItems, use 'json' data type (nullable if needed)
  orderItems: any;
  length: number;
}
