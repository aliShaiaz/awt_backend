import { Controller, Get, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @Get()
  @UsePipes(ValidationPipe)
  findAll(@Session() session) {
    const buyerEmail = session.buyer;
    return this.notificationService.findAll(buyerEmail);
  }

}
