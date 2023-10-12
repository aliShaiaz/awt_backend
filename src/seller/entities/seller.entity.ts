import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id : number;
  @Column()
  sellerName : string;
  @Column()
  sellerEmailAddress : string;
  @Column()
  sellerPassword:string;
  @Column()
  sellerPhoneNumber:number; // i think eita string hobe .. 
  @Column()
  sellerDescription?:string;
  @Column()
  sellerImage ?: string;
  @Column()
  shopName : string;
  @Column()
  shopDescription ?: string;
  @Column()
  shopLogo ?: string; 
  @Column()
  status ?: string; //🔰 etar value ENUM theke ashbe .. 
  @Column()
  rating ?: number;
  @Column()
  offlineShopAddress ?: string;
  @Column()
  googleMapLocation ?: string;
  //@Column('bytea', { nullable: true }) // Using 'bytea' type for image data
  //string; // Assuming you store image URLs here
}


