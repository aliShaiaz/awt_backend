import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
import { Order } from "../order.entity";
@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    CategoryID: number;

    @Column('text', {default : ""})
    name: string;

    @Column('text', {default : ""})
    description: string;
    /*
    // now i title can have may be multiple description 🔴
    // how we can design that ? 
    // like screen can be of many size ..
    // tile should be screen 
    // description should be max size 
    // small size */

    // 🔗 Many Specification To One Product 
    @OneToMany(() => Product, (product) => product.Category/*, {onDelete:'SET NULL'}*/)
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    productId: Product;


}