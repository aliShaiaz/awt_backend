import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entitys/admin.entity';
import { ManagerEntity } from './entitys/manager.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt.guard';
import { EmailService } from './mailer/email.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminEntity,ManagerEntity]),
        JwtModule.register({
            global: true,
            secret: 'my-secret', // Use a secure method to store your secret in production
            signOptions: { expiresIn: '2s' },
          }),
    ],
    controllers: [AdminController],
    providers: [AdminService,JwtAuthGuard,EmailService,]
})
export class AdminModule{}