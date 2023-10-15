import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Specification } from "./product/specificaiton.entity";

@Entity()
export class Order{
  @PrimaryGeneratedColumn()
  orderId : number;
  @Column()
  productId : number;
  @Column()
  productName :string; // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
  @Column()
  productQuantity : number;
  @Column()
  sellerId : number;
  @Column()
  sellerName : string; // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
  

  @OneToMany(()=> Specification, (specification) => specification.orderId, {eager: true})
  specifications : Specification[];
  // 🔴 i think etar jonno alada Specification Entity create korte hobe 
  // shetar nam hobe WantedSpecification Entity ..
  // Buyer jei ta order korte chay .. shetar specification 
    
  @Column()
  price : number;
  @Column()
  advancePaidMoney : number;
  @Column()
  dueAmount : number;
  @Column()
  estimatedDeliveryDate ?: Date;
  @Column()
  orderStatus: string; //🔰 etar value ENUM theke ashbe .. 
  @Column()
  orderType: string ; // 🔰 General / Pre Order

  @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn()
  updatedAt: Date; // Automatically saves the last update date and time

}