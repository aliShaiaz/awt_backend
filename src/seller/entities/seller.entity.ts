import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:'seller'})
export class Seller {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    buyer:string;
    @Column()
    email: string;
    @Column()
    address: string;

}
