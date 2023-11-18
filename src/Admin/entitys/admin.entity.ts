import { Entity, Column, PrimaryColumn, Unique, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ManagerEntity } from "./manager.entity";
import { NotificationEntity } from "./notification.entity";
import { AdminProfileEntity } from "./profile.entity";

@Entity('admin')
export class AdminEntity{
    @PrimaryColumn({unique: true})
    adminId:string;
    @Column()
    gmail: string;
    @Column()
    password: string;
    @Column({default:'on'})
    notificationStatus: string;



    @OneToMany(() => ManagerEntity, manager => manager.admin, { cascade: true, onDelete: 'CASCADE' })
    managers: ManagerEntity[];

    @OneToMany(() => NotificationEntity, notification => notification.admin, { cascade: true, onDelete: 'CASCADE' })
    notifications: NotificationEntity[];

    @OneToOne(()=>AdminProfileEntity,profile => profile.admin, { cascade: true, onDelete: 'CASCADE' })
    profile:AdminProfileEntity;



}