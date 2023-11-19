import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Buyer } from "./buyer.entity";

@Entity()
export class CreditCartEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    CardNumber: string;

    @Column()
    CardHolderName: string;

    @Column()
    ExpDate: string; // Change to lowercase 'string'

    @Column()
    CVV_code: string;

    @OneToOne(() => Buyer, (buyer) => buyer.creditCard)
    @JoinColumn()
    buyer: Buyer;
}
