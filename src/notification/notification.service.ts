import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from 'src/buyer/entities/buyer.entity';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Buyer) private readonly buyerRepository: Repository<Buyer>,
  ){}

  async findAll(buyerEmail: string) {
    const buyer = await this.buyerRepository.findOne({ where: { buyerEmail: buyerEmail } });
    
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    return this.notificationRepository.find({ where: { buyer: { id: buyer.id } } });
  }
}
