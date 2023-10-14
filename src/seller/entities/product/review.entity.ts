import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { type } from "os";
import { ReviewCategoryEnum } from "src/seller/model/review.model";
@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    reviewCategory : ReviewCategoryEnum;

    @Column()
    reviewDetails : string;

    // Many Review To One Product
    @ManyToOne(() => Product, (product) => product.reviews, {onDelete:'SET NULL'})
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    product: Product;
}