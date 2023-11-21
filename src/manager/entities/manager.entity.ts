import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Manager {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({unique: true})
    email : string;

    @Column({select:false})
    password : string;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updateAt:Timestamp;

    @OneToMany(()=>Category,(cat)=>cat.addedBy)
    categories:Category[];

    @OneToMany(()=>Brand,(bran)=>bran.addedBy)
    brand:Brand[];

}
