import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('buyer')
export class BuyerEntity{

  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  buyerFirstName: string;
 
  @Column({ nullable: true })
  buyerLastName: string;
 
 
  @Column({unique:true})
  buyerEmail: string;
 
  @Column({ nullable: true })
  buyerDateOfBirth: Date;
 
  @Column()
  buyerPhoneNo: string;
 
  @Column({ nullable: true })
  buyerGender: string;
 
  @Column({ nullable: true })
  buyerAddresses: string;
 
  @Column({ nullable: true })
  buyerimage: string;

}