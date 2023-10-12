import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
  @Column()
  specification :
    {
    title: string;
    description : string;
    }[];
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