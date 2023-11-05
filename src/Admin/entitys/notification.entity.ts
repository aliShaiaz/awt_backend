import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity('notification')
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    managerId: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => AdminEntity, admin => admin.notifications)
    @JoinColumn({ name: 'adminId' })
    admin: AdminEntity;


    
}
