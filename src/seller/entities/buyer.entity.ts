import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  BuyerId: number;

  @Column()
  BuyerFirstName: string;

  @Column()
  BuyerLastName: string;

  @Column()
  BuyerPassword: string;

  @Column()
  BuyerEmail: string;

  @Column()
  BuyerDOB: Date;

  @Column()
  BuyerPhoneNo: string;

  // @Column()
  // BuyerGender: string; // gender upor base kore .. take product show korbo 

  @Column()
  BuyerAddress: string; //  arekta table create korte hobe .. jekhane details thakbe .. 
  
  @OneToMany(() => Order, (order) => order.orderId)
  Orders : Order[] // 🔴😥 not sure 

  @OneToMany(() => Message, (message) => message.messageId)
  messages: Message[];
}