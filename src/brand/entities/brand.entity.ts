import { Manager } from "src/manager/entities/manager.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'brand'})
export class Brand {
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

    @ManyToOne(()=>Manager,(manager)=>manager.brand)
    addedBy:Manager;
    brand: Promise<Manager>;


}



