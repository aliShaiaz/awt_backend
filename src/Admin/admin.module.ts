import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entitys/admin.entity';
import { ManagerEntity } from './entitys/manager.entity';
import { NotificationEntity } from './entitys/notification.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt.guard';
import { EmailService } from './mailer/email.service';
import { NotificationService } from './notification/notification.service';
import { AdminProfileEntity } from './entitys/profile.entity';
import { BuyerEntity } from './entitys/buyer.entity';
import { SellerEntity } from './entitys/seller.entity';
import { SupplierProfileEntity } from './entitys/supplierProfile.entity';
import { SuppliedProductEntity } from './entitys/suppliedProduct.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminEntity,ManagerEntity,NotificationEntity,AdminProfileEntity,
        BuyerEntity,SellerEntity, SuppliedProductEntity, SupplierProfileEntity, ]),
        JwtModule.register({
            global: true,
            secret: 'my-secret', 
            signOptions: { expiresIn: '2s' },
          }),
    ],
    controllers: [AdminController],
    providers: [AdminService,JwtAuthGuard,EmailService,NotificationService,]
})
export class AdminModule{}