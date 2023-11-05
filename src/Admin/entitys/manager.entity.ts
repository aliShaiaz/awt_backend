import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";
@Entity('manager')
export class ManagerEntity{
    
    @PrimaryColumn({unique: true})
    managerId: string;
    @Column()
    name: string;
    @Column()
    gmail: string;
    @Column({ nullable: true })
    address: string;
    @Column({nullable: true})
    birthDay:string|null;
    @Column({ nullable: true })
    bloodGroup: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    pic:string|null;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // This line sets up the column with current timestamp
    joiningTime: Date;


    @ManyToOne(() => AdminEntity, admin => admin.managers)
    @JoinColumn({ name: 'adminId' }) // This is the foreign key
    admin: AdminEntity;
    
}