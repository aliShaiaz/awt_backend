import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    title: string;
    @Column()
    description: string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}