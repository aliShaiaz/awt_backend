import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
@Entity()
export class AvailableQuality{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quality: string;

    // Many Quality To One Product
    @ManyToOne(() => Product, (product) => product.availableQuality)
    product: Product;
}