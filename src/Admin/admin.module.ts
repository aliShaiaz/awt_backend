import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entitys/admin.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([AdminEntity])
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule{}