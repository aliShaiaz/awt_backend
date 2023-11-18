import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"


@Entity('seller')
export class SellerEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id : number;

  @Column()
  sellerName : string;

  @Column({unique:true})
  sellerEmailAddress : string;

  @Column()
  sellerPassword:string;

  @Column({ nullable: true })
  sellerPhoneNumber:string; 

  @Column({ nullable: true })
  sellerDescription?:string;

  @Column({ nullable: true })
  sellerImage: string; 

  @Column({ nullable: true })
  shopName : string;

  @Column({ nullable: true })
  shopDescription ?: string;

  @Column({ nullable: true })
  shopLogo : string;
  
  @Column({default:'new'})
  status : string;

  @Column({ nullable: true })
  rating : number;

  @Column({ nullable: true })
  offlineShopAddress: string;

  @Column({ nullable: true })
  googleMapLocation: string;

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date;


}