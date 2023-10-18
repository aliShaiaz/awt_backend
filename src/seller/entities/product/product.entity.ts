import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

import { ReviewCategoryEnum } from "../../model/review.model";
import { AvailableQuality } from "./availableQuality.entity";
import { Specification } from "./specificaiton.entity";
import { Review } from "./review/review.entity";
import { Category } from "./category.entity";
import { Brand } from "./brand.entity";
// import { Lazy } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column('text', {default : ""})
  name: string;
  @Column('text', {default : ""})
  details ?: string;
  @Column('text', {default : ""}) // 🔴
  productImage ?: string; // string // this should be an array 
  @Column({default : 0})
  rating: number;
  @Column({default : 0})
  price : number; // may be price can be an array 
  @Column({default : 0})
  availableQuantity : number; /// stockStatus nam e ki arekta field rakhar dorkar ase ?
  @Column({default : 0})
  lowestQuantityToStock : number; // 🔰 available quantity , lowestQuantityToStock er shoman hoile seller er kas e notification jabe .. 
 
  /**
   * whats the type, what does it map to on the other table or the entity
    🟢{eager: true}  mane hocche .. joto bar ekta product er data dekhte chabo 
    amake bole deowa lagbe na .. tar availableQuality gulao dekhte chai .. 
    automatic product er data er shathe availableQuality er data o dekhabe .. 
  */
 //🔰 etar value ENUM theke ashbe ..
  @OneToMany(() => AvailableQuality, (availableQuality) => availableQuality.productId, {eager: true , cascade: true, lazy : true})//availableQuality table e product column na thakle error dibe 
  
  //@Generated() // 😥
  availableQualitys  ?: AvailableQuality[]; //🔴🔗 One Product can have many quality
  //availableQualitys  ?: Lazy<AvailableQuality[]>; //🔴🔗 One Product can have many quality 
  
  /*
  //🟢 category should be another table / entity .. product and category should have .... relationship 
    category -> id , name 
  */
  
  // One Product Can Have Many Specification 
  // 🔗 One Product can have many Specification 
  @OneToMany(() => Specification, (specification) => specification.productId, {eager: true , cascade: true, lazy : true})
  specifications:  Specification[];
    
  @OneToMany(() => Review, (review) => review.productId, {eager: true, cascade: true, lazy : true})
  reviews : Review[]; //🔗 One Product can have many Review
  
  @ManyToOne(() => Category, (category) => category.productId,{eager : true} /*{eager: true, cascade: true, lazy : true} */)
  Category : Category; 

  @ManyToOne(() => Brand, (brand) => brand.productId,{eager : true}/*{eager: true, cascade: true, lazy : true} */)
  Brand : Brand; 
 
  @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn()
  updatedAt: Date; // Automatically saves the last update date and time

}
/**
 * 
 * @Column("enum", { enum: ["A", "B", "C"] })
    enum: string

    @Column("bytea")
    bytea: Buffer

      @Column({type: 'enum', enum : CategoryEnum, default : CategoryEnum.Enhancement})
  category : string;

  @Column('text', {default : ""}) // type 
  description :string;


  @Column({default: 0})
  upvote :number;
 */
/**
 * 
 * @Column()
    specification: 
    
    {
    title: string;
    description : string;
    }[]
 */