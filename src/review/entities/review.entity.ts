import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'review'})
export class Review {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    buyer:string;
    @Column()
    product: string;
    @Column()
    review: string;

}
