import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
@Entity()
export class Specification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    // 🔗 Many Specification To One Product 
    @ManyToOne(() => Product, (product) => product.availableQuality)
    product: Product;
}