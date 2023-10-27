import { Entity, Column, PrimaryColumn, Unique } from "typeorm";

@Entity('admin')
export class AdminEntity{
    @PrimaryColumn({unique: true})
    id:string;
    @Column()
    name:string;
    @Column()
    gmail: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    pic:string|null;

}