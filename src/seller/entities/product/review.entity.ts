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
    @ManyToOne(() => Product, (product) => product.availableQuality)
    product: Product;
}