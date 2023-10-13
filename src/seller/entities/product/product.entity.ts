import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from "typeorm"

import { ReviewCategoryEnum } from "../../model/review.model";
import { AvailableQuality } from "./availableQuality.entity";
import { Specification } from "./specificaiton.entity";
import { Review } from "./review.entity";
@Entity()
export class Product {
  @PrimaryGeneratedColumn({
    type: 'integer'
})
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
  lowestValueToStock : number; // 🔰 available quantity , lowestValueToStock er shoman hoile seller er kas e notification jabe .. 
 
  //🔰 etar value ENUM theke ashbe ..
  @OneToMany(() => AvailableQuality, (availableQuality) => availableQuality.product)
  @Generated() // 😥
  availableQuality  ?: AvailableQuality[]; //🔴🔗 One Product can have many quality 
  //availableQuality  ?: AvailableQuality;
  /*
  //🟢 category should be another table / entity .. product and category should have .... relationship 
    category -> id , name 
  */
  
  // One Product Can Have Many Specification 
  // 🔗 One Product can have many Specification 
  @OneToMany(() => Specification, (specification) => specification.product)
  specification:  Specification[];
    
  @OneToMany(() => Review, (review) => review.product)
  review : Review[]; //🔗 One Product can have many Review
    
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