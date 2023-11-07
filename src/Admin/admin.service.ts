import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminEntity } from "./entitys/admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ManagerEntity } from "./entitys/manager.entity";
import { NotificationEntity } from "./entitys/notification.entity";
import { AdminProfileEntity } from "./entitys/profile.entity";
import { AdminInfo } from "./dtos/admin.dto";


@Injectable()
export class AdminService {
    private readonly jwtConstants = {
    secret: 'my-secret'
    };
    private adminRepo: Repository<AdminEntity>;
    constructor(
      private readonly jwtService: JwtService,
        @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity) private readonly managerRepository: Repository<ManagerEntity>, 
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(AdminProfileEntity) private readonly adminProfileRepository: Repository<AdminProfileEntity>,
    )
    {
        this.adminRepo = adminRepository;
    }


    async findAdminById(adminId: string): Promise<AdminEntity | null> {
      return this.adminRepository.findOne({ where: { adminId } });
    }

    async managerExist(managerId: string): Promise<boolean>{
      const state = await this.managerRepository.findOne({
        where: { managerId },
      });
      console.log(state);
      if(state){
        return true;
      }
      return false;

    }
  

      async generateToken(adminId: any): Promise<string> {
        const token = await this.jwtService.sign(adminId, {
          secret: this.jwtConstants.secret,
          expiresIn: '1h',
        });
        return token;
      }

      async findUserById(adminId: string): Promise<AdminEntity | null> {
        return this.adminRepository.findOne({ where: { adminId } });
    }


    // 1--> Create account

    async createAccount(adminData: AdminInfo,): Promise<AdminEntity>{
      const admin = new AdminEntity();
      admin.adminId = adminData.adminId;
      admin.gmail = adminData.gmail;
      admin.password = adminData.password;

      const profile = new AdminProfileEntity();
      profile.name = adminData.name;
      profile.pic = adminData.pic;
      profile.admin = admin;
      
      const adminA = await this.adminRepo.save(adminData);
      await this.adminProfileRepository.save(profile)
      //return this.adminRepo.save(adminData);
      return (adminA)
    }

  
  
  


    // 2--> Update Account

    async updateUser(adminId: string, adminData: Partial<AdminEntity>, profileData:Partial<AdminProfileEntity>): Promise<AdminEntity | null> {
      const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
      if (!existingUser) {
          return null; // Return null if user not found
      }
  
      // Use the update method to apply the changes
      await this.adminRepository.update({ adminId }, adminData);

      await this.adminProfileRepository.update({ admin: existingUser }, profileData);
  
      // Retrieve the updated user
      return this.adminRepository.findOne({ where: { adminId } });
    }

    // async updateProfile(adminId:string,profileData:Partial<AdminProfileEntity>) {
    //   const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
    //   if (!existingUser) {
    //       return null; // Return null if user not found
    //   }
  
    //   await this.adminProfileRepository.update({adminId},profileData)
  
    //   return this.adminRepository.findOne({ where: { adminId } });
    // }


    // 3--> Delete account

    async deleteAccount(adminId: string): Promise<void> {
      const admin = await this.adminRepository.findOne({ where: { adminId }, relations: ['managers', 'notifications','profile'] });
    
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
    
      //Here I remove associated managers first
      if(admin.managers){
      await this.managerRepository.remove(admin.managers);
      }
      //Then associated notifications
      if(admin.notifications){
      await this.notificationRepository.remove(admin.notifications);
      }
      if(admin.profile){
      await this.adminProfileRepository.remove(admin.profile);
      }
    
      // Finally, remove the admin
      await this.adminRepository.remove(admin);
    }
    
  

    // 4--> Login

    async login(adminId: string, password: string): Promise<string> {
      const admin = await this.adminRepository.findOne({ where: { adminId } });
      
      if (!admin) {
        throw new NotFoundException('User not found');
      }
    
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (isValidPassword) {
        const token = await this.generateToken({ id: admin.adminId });
        return token;
      }
    
      return null;
   }


      // Method to get the admin ID from the token
      getAdminIdFromToken(token: string): string {
      const decoded = this.jwtService.verify(token, { secret: this.jwtConstants.secret }) as { id: string };
      return decoded.id;
      }

      //5--> Logout. Nothing to do in service

      // 6--> Add Manager
    
    async addManager(token: string, managerData: any): Promise<ManagerEntity> {
      const adminId = this.getAdminIdFromToken(token);
      const admin = await this.findAdminById(adminId);
  
      if (!admin) {
          throw new NotFoundException('Admin not found');
      }

  
      const manager = new ManagerEntity(); // Create a new instance of ManagerEntity
      manager.managerId = managerData.managerId;
      manager.name = managerData.name; // Set the properties from managerData
      manager.gmail = managerData.gmail;
      manager.address = managerData.address;
      manager.password = managerData.password;


      // Set other properties as needed
  
      manager.admin = admin; // Assign the admin to the manager
  
      return this.managerRepository.save(manager);
    }



    // 7 --> Delete manager by Id

    async deleteManager(managerId: string): Promise<string> {
      const manager = await this.managerRepository.findOne({where:{managerId}});
      const notificationManager = await this.notificationRepository.findOne({where:{managerId}});
      if (manager) {
        await this.managerRepository.remove(manager);

        if(notificationManager){
          await this.notificationRepository.remove(notificationManager);
        }
        return 'Manager deleted successfully';
      } else {
        throw new NotFoundException('Manager not found');
      }
    }




     // 8 -->  Get all manager

    async getAllManagers(): Promise<Array<{ manager: ManagerEntity; admin: AdminEntity }>> {
      const managers = await this.managerRepository.find({ relations: ['admin'] });
    
      return managers.map((manager) => ({
        manager,
        admin: manager.admin,
      }));
    }


    // 9--> Get a manager by ID

    async getManagerById(managerId: string): Promise<{ manager: ManagerEntity, admin: AdminEntity } | string> {
      const manager = await this.managerRepository.findOne({ where: { managerId }, relations: ['admin'] });
    
      if (manager) {
        return {
          manager,
          admin: manager.admin,
        };
      }

      return "This manager does not exist";
    }


    async managerById(managerId: string): Promise<ManagerEntity | null> {
      const manager = await this.managerRepository.findOne({ where: { managerId }, relations: ['admin'] });
    
      if (manager) {
        return manager;
      }

      return null;
    }


    // async getNewManagers(): Promise<ManagerEntity[]> {
    //   const currentDate = new Date();
    //   currentDate.setMinutes(currentDate.getMinutes() - 1); // Adjust the time as needed
    //   return this.managerRepository.createQueryBuilder('manager')
    //       .where('manager.joiningTime > :date', { date: currentDate })
    //       .getMany();
    // }


     // 11--> Un/mute (On/Off) notification
    async setNotificationStatus(token:string , status:string): Promise<AdminEntity|null> {
          const adminId = this.getAdminIdFromToken(token);
          const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
      if (!existingUser) {
          return null; 
      }
  
      await this.adminRepository.update({ adminId }, {notificationStatus:status});
  
      // Retrieve the updated user
      return this.adminRepository.findOne({ where: { adminId } });
    }
  

    
    

}