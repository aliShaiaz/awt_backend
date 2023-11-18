import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { SupplierProfileEntity } from "./supplierProfile.entity";

@Entity('supplied_product')
export class SuppliedProductEntity{
    remove() {
      throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    suppliedProductId: number;

    @Column()
    product_name: string;

    @Column()
    catergory: string;

    @ManyToOne(() => SupplierProfileEntity, supplierProfile => supplierProfile.suppliedProduct)
    @JoinColumn({ name: 'supplierId' }) // This is the foreign key
    supplierProfile: SupplierProfileEntity;
    
}