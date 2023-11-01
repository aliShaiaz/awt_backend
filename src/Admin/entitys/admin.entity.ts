import { Entity, Column, PrimaryColumn, Unique, OneToMany } from "typeorm";
import { ManagerEntity } from "./manager.entity";

@Entity('admin')
export class AdminEntity{
    @PrimaryColumn({unique: true})
    adminId:string;
    @Column()
    name:string;
    @Column()
    gmail: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    pic:string|null;
    

    @OneToMany(() => ManagerEntity, manager => manager.admin, { cascade: true, onDelete: 'CASCADE' })
    managers: ManagerEntity[];

}