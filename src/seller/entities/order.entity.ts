import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
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
  

  @OneToMany(()=> Specification, (specification) => specification.order)
  specification : Specification[];
    
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
}