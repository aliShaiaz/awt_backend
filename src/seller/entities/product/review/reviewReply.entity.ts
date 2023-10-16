import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product.entity";
import { type } from "os";
import { ReviewCategoryEnum } from "src/seller/model/review.model";
import { Review } from "./review.entity";
import { Seller } from "../../seller.entity";
@Entity()
export class ReviewReply{
    @PrimaryGeneratedColumn()
    replyId: number;


    @Column()
    replyDetails : string;

    // Many reviewReply to One Review  
    @ManyToOne(() => Review, (review) => review.replies, {onDelete:'CASCADE'}) // onDelete:'SET NULL', 
    reviewId: Review;

    //🔴 circular dependency issue // partially solve 
    // @ManyToOne(() => ReviewReply, (reviewReply) => reviewReply.childReplies,{cascade: ['insert']} /*🟢solve ERROR by commenting this  [ExceptionsHandler] Maximum call stack size exceeded in nest js and typeorm { onDelete: 'CASCADE', nullable: true }*/)
    // parentReplyId: ReviewReply; // The parent reply to which this reply is directed


    // 🔴 circular dependency issue // partially solve 
    // one review can have many reply 
    // @OneToMany(() => ReviewReply, (reviewReply) => reviewReply.parentReplyId,{cascade: ['insert']}/* { eager: true, cascade: true }*/)
    // childReplies: ReviewReply[]; // One review can have multiple replies
    // Multiple replies to this reply

    @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn() 
  updatedAt: Date; // Automatically saves the last update date and time

  //🟢 seller can give reviewReply many to one 
  @ManyToOne(() => Seller, (seller) => seller.reviewReplies, {onDelete:'CASCADE'},) // onDelete:'SET NULL',
  sellerId : number; // One seller can have multiple reviewReply


}