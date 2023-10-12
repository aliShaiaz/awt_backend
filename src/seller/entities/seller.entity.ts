import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  // 🤔 now if i want to give a custom id .. then how can i do that ?
  // @PrimaryGeneratedColumn('uuid') // what is this ? 
  id : number;
  @Column()
  sellerName : string;
  @Column({ nullable: true })
  sellerEmailAddress : string;
  @Column({ nullable: true })
  sellerPassword:string;
  @Column({ nullable: true })
  sellerPhoneNumber:number; // i think eita string hobe .. 
  @Column({ nullable: true })
  sellerDescription?:string;
  @Column({ nullable: true })
  sellerImage ?: string;
  @Column({ nullable: true })
  shopName : string;
  @Column({ nullable: true })
  shopDescription ?: string;
  @Column({ nullable: true })
  shopLogo ?: string; 
  @Column({ nullable: true })
  status ?: string; //🔰 etar value ENUM theke ashbe .. 
  @Column({ nullable: true })
  rating ?: number;
  @Column({ nullable: true })
  offlineShopAddress ?: string;
  @Column({ nullable: true })
  googleMapLocation ?: string;
  //@Column('bytea', { nullable: true }) // Using 'bytea' type for image data
  //string; // Assuming you store image URLs here
}


