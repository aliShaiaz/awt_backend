import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { CreditCartEntity } from './credit-card.entity';

@Entity()
export class Buyer {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerFirstName: string;

  @Column()
  buyerLastName: string;

  @Column()
  buyerPassword: string;

  @Column({unique:true})
  buyerEmail: string;

  @Column()
  buyerDateOfBirth: Date;

  @Column()
  buyerPhoneNo: string;

  @Column()
  buyerGender: string;

  @Column()
  buyerAddresses: string;

  @Column({ nullable: true })
  buyerimage: string;


  @OneToMany(() => Order, (order) => order.buyer)
  @JoinColumn()
  orders: Order[];
  reviews: any;
  notifications: any;


  @OneToOne(() => CreditCartEntity, (creditCard) => creditCard.buyer)
  @JoinColumn()
  creditCard: CreditCartEntity;
}
