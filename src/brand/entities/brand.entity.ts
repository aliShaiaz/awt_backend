import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
