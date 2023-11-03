import { Manager } from "src/manager/entities/manager.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updatedAt:Timestamp;

    @ManyToOne(()=>Manager,(manager)=>manager.categories)
    addedBy:Manager;
  category: Promise<Manager>;


}



