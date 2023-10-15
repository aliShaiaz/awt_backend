import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product.entity";
import { type } from "os";
import { ReviewCategoryEnum } from "src/seller/model/review.model";
import { ReviewReply } from "./reviewReply.entity";
// controller service  16 
@Entity()
export class Review{
    // 🔴 timestamp add korte hobe ..
    // database e create houar shomoy jeno
    // automatically time add hoy  
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    reviewCategory : ReviewCategoryEnum;

    @Column()
    reviewDetails : string;

    // Many Review To One 🟢Product
    @ManyToOne(() => Product, (product) => product.reviews, {onDelete:'CASCADE'},) // onDelete:'SET NULL', 
    /**
   * whats the type, what does it map to on the other table or the entity
   * // kono employee delete hoye gele .. task table er ei employee option e 
   * //null assign kore dibo .. jeno pore onno kono employee ke ei task assign kore deowa jete pare 
   */
    productId: Product;

    

    // 🔴 circular dependency issue // partially solve .. dont know how 
    // one review can have many reply 
    @OneToMany(() => ReviewReply, (reviewReply) => reviewReply.reviewId, { eager: true, cascade: true })
    replies: ReviewReply[]; // One review can have multiple replies

    @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn()
  updatedAt: Date; // Automatically saves the last update date and time

}