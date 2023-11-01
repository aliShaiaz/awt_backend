import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminEntity } from "./entitys/admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ManagerEntity } from "./entitys/manager.entity";
import { promises } from "dns";


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
        return false;
      }
      return true;

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

    async createAccount(data: any): Promise<AdminEntity>{
      return this.adminRepo.save(data);
    }


    // 2--> Update Account

    async updateUser(adminId: string, updatedData: Partial<AdminEntity>): Promise<AdminEntity | null> {
      const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
      if (!existingUser) {
          return null; // Return null if user not found
      }
  
      // Use the update method to apply the changes
      await this.adminRepository.update({ adminId }, updatedData);
  
      // Retrieve the updated user
      return this.adminRepository.findOne({ where: { adminId } });
    }
    

    // 3--> Delete account

    async deleteAccount(adminId: string): Promise<void> {
      const admin = await this.adminRepository.findOne({
        where: { adminId },
        relations: ['managers'], // Load the managers relation
      });
      
      console.log(admin);
      console.log(admin?.managers);
      
      if (admin) {
        await this.managerRepository.remove(admin.managers);
        await this.adminRepository.remove(admin);
      }
      
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

      console.log(manager.managerId);
      console.log(manager.name);
      console.log(manager.gmail);
      console.log(manager.password);

      // Set other properties as needed
  
      manager.admin = admin; // Assign the admin to the manager
  
      return this.managerRepository.save(manager);
    }



    // 7 --> Delete manager by Id

    async deleteManager(managerId: string): Promise<string> {
      const manager = await this.managerRepository.findOne({where:{managerId}});
    
      if (manager) {
        await this.managerRepository.remove(manager);
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
    
    

}