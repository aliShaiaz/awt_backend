import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
import { Order } from "../order.entity";
@Entity()
export class Specification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {default : ""})
    title: string;

    @Column('text', {default : ""})
    description: string;

    // 🔗 Many Specification To One Product 
    @ManyToOne(() => Product, (product) => product.specifications, {onDelete:'SET NULL'})
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    product: Product;

    // 🔗 Many Specification To One Product 
    @ManyToOne(() => Order, (order) => order.specifications, {onDelete:'SET NULL'})
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    order: Order;

}