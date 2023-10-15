import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Seller {
  
  // 🤔 now if i want to give a custom id .. then how can i do that ?
  // @PrimaryGeneratedColumn('uuid') // what is this ? 
  @PrimaryGeneratedColumn()
  id : number;
  @Column('text', {default : ""})
  sellerName : string;
  @Column('text', {default : ""})
  sellerEmailAddress : string;
  @Column('text', {default : ""})
  sellerPassword:string;
  @Column({default : 0})
  sellerPhoneNumber:number; // i think eita string hobe .. 
  @Column('text', {default : ""})
  sellerDescription?:string;
  @Column('text', {default : ""})// 🔴
  sellerImage ?: string; 
  @Column('text', {default : ""})
  shopName : string;
  @Column('text', {default : ""})
  shopDescription ?: string;
  @Column('text', {default : ""})
  shopLogo ?: string; 
  @Column('text', {default : ""})
  status ?: string; //🔰 etar value ENUM theke ashbe .. 
  @Column('text', {default : ""})
  rating ?: number;
  @Column('text', {default : ""})
  offlineShopAddress ?: string;
  @Column('text', {default : ""})
  googleMapLocation ?: string;

  @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn()
  updatedAt: Date; // Automatically saves the last update date and time

  //@Column('bytea', { nullable: true }) // Using 'bytea' type for image data
  //string; // Assuming you store image URLs here
}


