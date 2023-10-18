import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  BuyerId: number;

  @Column('text', {default : ""})
  BuyerFirstName: string;

  @Column('text', {default : ""})
  BuyerLastName: string;

  @Column('text', {default : ""})
  BuyerPassword: string;

  @Column('text', {default : ""})
  BuyerEmail: string;

  @Column('text', {default : ""})
  BuyerDOB: Date;

  @Column('text', {default : ""})
  BuyerPhoneNo: string; // phone number show hide rakhar condition rakha jabe 

  // @Column()
  // BuyerGender: string; // gender upor base kore .. take product show korbo 

  @Column('text', {default : ""})
  BuyerAddress: string; //  arekta table create korte hobe .. jekhane details thakbe .. 
  
  @OneToMany(() => Order, (order) => order.orderId)
  Orders : Order[] // 🔴😥 not sure 


  @OneToMany(() => Message, (message) => message.messageId)
  messages: Message[];// 🔴😥 not sure 
}