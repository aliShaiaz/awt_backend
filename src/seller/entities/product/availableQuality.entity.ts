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
    @ManyToOne(() => Product, (product) => product.availableQualitys, {onDelete:'SET NULL'})
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    productId: Product;
    // ekhane ki product likhle valo hoito
    // naki productId
}