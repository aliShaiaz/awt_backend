import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { SuppliedProductEntity } from "./suppliedProduct.entity";

@Entity('supplier')
export class SupplierProfileEntity{
    @PrimaryGeneratedColumn()
    supplierId: number;

    @Column()
    name: string;

    @Column()
    gmail: string;

    @OneToMany(() => SuppliedProductEntity, suppliedProduct => suppliedProduct.supplierProfile, { cascade: true, onDelete: 'CASCADE' })
    suppliedProduct: SuppliedProductEntity[];

}