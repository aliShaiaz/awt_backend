import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "../entitys/notification.entity";
import { AdminEntity } from "../entitys/admin.entity";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../mailer/email.service";

@Injectable()
export class NotificationService {
    private readonly jwtConstants = {
        secret: 'my-secret'
        };
   
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService:EmailService,
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async sendNotificationToAdmin(managerId: string, token: string) { // Pass the token as an argument
    console.log('sendNotificationToAdmin called');
    console.log(token);
    const decoded = this.jwtService.verify(token, { secret: this.jwtConstants.secret }) as { id: string };
    const currentAdminId = decoded.id;
    
    console.log(currentAdminId);
    const admin = await this.adminRepository.findOne({where:{adminId: currentAdminId}});
    console.log('Admin found:', admin);
    

    const currentAdminGmail = admin.gmail;
    const adminNotificationStatus = admin.notificationStatus;
  
    if (admin) {
      const message = `New manager with ID ${managerId} has joined.`;
      const notification = new NotificationEntity();
      notification.message = message;
      notification.managerId = managerId;
      notification.admin = admin;
      if(adminNotificationStatus== 'on'){
        console.log("Notification Status on");
      await this.emailService.sendMail(currentAdminGmail,"New manager join",message);
      }
  
      try {
        await this.notificationRepository.save(notification);
      } catch (error) {
        console.error('Error saving notification:', error);
      }
    }
  }


}
