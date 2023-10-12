import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
import { Order } from "../order.entity";
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

    // 🔗 Many Specification To One Product 
    @ManyToOne(() => Order, (order) => order.specification)
    order: Order;

}