import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Buyer])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
