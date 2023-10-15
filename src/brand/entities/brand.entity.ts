import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  BrandID: number;

  @Column()
  Name: string;

  @OneToMany(() => Product, (product) => product.Brand)
  products: Product[];
}
