import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity('profile')
export class AdminProfileEntity{
    @PrimaryGeneratedColumn()
    profileId: string;
    @Column()
    name:string;
    @Column({ nullable: true })
    pic:string|null;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    joiningDate: Date;


    @OneToOne(() => AdminEntity, admin => admin.profile)
    @JoinColumn({ name: 'adminId' })
    admin: AdminEntity;

}