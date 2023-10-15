import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  BuyerFirstName: string;

  @Column()
  BuyerLastName: string;

  @Column()
  BuyerPassword: string;

  @Column()
  BuyerEmail: string;

  

  @Column()
  BuyerDateOfBirth: Date;

  @Column()
  BuyerPhoneNo: string;

  @Column()
  BuyerGender: string;

  @Column()
  BuyerAddresses: string;
}
