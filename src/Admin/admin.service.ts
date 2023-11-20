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
import { BuyerInfo } from "./dtos/buyer.dto";
import { BuyerEntity } from "./entitys/buyer.entity";
import { SellerInfo } from "./dtos/seller.dto";
import { SellerEntity } from "./entitys/seller.entity";
import { SuppliedProductInfo } from "./dtos/suppliedProduct.dto";
import { SupplierProfileEntity } from "./entitys/supplierProfile.entity";
import { SupplierProfileInfo } from "./dtos/supplierProfile.dto";
import { SuppliedProductEntity } from "./entitys/suppliedProduct.entity";



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
        @InjectRepository(BuyerEntity) private readonly buyerRepository:Repository<BuyerEntity>,
        @InjectRepository(SellerEntity) private readonly sellerRepository:Repository<SellerEntity>,
        @InjectRepository(SupplierProfileEntity) private readonly supplierProfileRepository: Repository<SupplierProfileEntity>,
        @InjectRepository(SuppliedProductEntity) private readonly suppliedProductRepository: Repository<SuppliedProductEntity>,
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

    async createAccount(adminData: AdminInfo,): Promise<AdminEntity|string>{
      try{
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
      catch (error) {
        console.error("Error is:", error);
        return "Something went wrong";
    }
    }

  
  
  


    // 2--> Update Account

    async updateUser(adminId: string, adminData: Partial<AdminEntity>, profileData:Partial<AdminProfileEntity>): Promise<AdminEntity | null|string> {
      try{
      const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
      if (!existingUser) {
          return null; // Return null if user not found
      }
  
      // Use the update method to apply the changes
      await this.adminRepository.update({ adminId }, adminData);

      await this.adminProfileRepository.update({ admin: existingUser }, profileData);
  
      // Retrieve the updated user
      return this.adminRepository.findOne({ where: { adminId } });
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }


    // 3--> Delete account

    async deleteAccount(adminId: string): Promise<void|string> {
      try{
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
    catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }
    
  

    // 4--> Login

    async login(adminId: string, password: string): Promise<string> {
      try{
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
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
   }


      // Method to get the admin ID from the token
      getAdminIdFromToken(token: string): string {
      const decoded = this.jwtService.verify(token, { secret: this.jwtConstants.secret }) as { id: string };
      return decoded.id;
      }

      //5--> Logout. Nothing to do in service

      // 6--> Add Manager
    
    async addManager(token: string, managerData: any): Promise<ManagerEntity|string> {
      try{
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
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }



    // 7 --> Delete manager by Id

    async deleteManager(managerId: string): Promise<string> {
      try{
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
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }




     // 8 -->  Get all manager

    async getAllManagers(): Promise<Array<{ manager: ManagerEntity; admin: AdminEntity }>|string> {
      try{
      const managers = await this.managerRepository.find({ relations: ['admin'] });
    
      return managers.map((manager) => ({
        manager,
        admin: manager.admin,
      }));
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }


    // 9--> Get a manager by ID

    async getManagerById(managerId: string): Promise<{ manager: ManagerEntity, admin: AdminEntity } | string> {
      try{
      const manager = await this.managerRepository.findOne({ where: { managerId }, relations: ['admin'] });
    
      if (manager) {
        return {
          manager,
          admin: manager.admin,
        };
      }

      return "This manager does not exist";
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
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
    async setNotificationStatus(token:string , status:string): Promise<AdminEntity|null|string> {
      try{
          const adminId = this.getAdminIdFromToken(token);
          const existingUser = await this.adminRepository.findOne({ where: { adminId } });
  
      if (!existingUser) {
          return null; 
      }
  
      await this.adminRepository.update({ adminId }, {notificationStatus:status});
  
      // Retrieve the updated user
      return this.adminRepository.findOne({ where: { adminId } });
    }catch (error) {
      console.error("Error is:", error);
      return "Something went wrong";
  }
    }
  

    // Buyers operation

    async addBuyer(buyerInfo: BuyerInfo): Promise<BuyerEntity|string> {
      const existingBuyer = await this.buyerRepository.findOne({ where: { buyerEmail: buyerInfo.buyerEmail } });

      if (existingBuyer) {
        throw new Error('Buyer with this email already exists');
      }

      const buyer = new BuyerEntity();
      buyer.buyerFirstName = buyerInfo.buyerFirstName;
      buyer.buyerLastName = buyerInfo.buyerLastName;
      buyer.buyerEmail = buyerInfo.buyerEmail;
      buyer.buyerDateOfBirth = buyerInfo.buyerDateOfBirth;
      buyer.buyerPhoneNo = buyerInfo.buyerPhoneNo;
      buyer.buyerGender = buyerInfo.buyerGender;
      buyer.buyerAddresses = buyerInfo.buyerAddresses;
      buyer.buyerimage = buyerInfo.buyerimage;
    
      return this.buyerRepository.save(buyer);
    }

    async getAllBuyers(): Promise<BuyerEntity[]> {
      return this.buyerRepository.find();
    }


    // Seller operation

    async createSeller(createSellerDto: SellerInfo): Promise<SellerEntity|string> {
      const { sellerEmailAddress } = createSellerDto;
  
      const existingSeller = await this.sellerRepository.findOne({
        where: { sellerEmailAddress },
      });
  
      if (existingSeller) {
        throw new Error('Seller with this email already exists');
      }
  
      const seller = this.sellerRepository.create(createSellerDto);
      return await this.sellerRepository.save(seller);
    }



    async findSellerById(id: number): Promise<SellerEntity | string> {
      const seller = await this.sellerRepository.findOne({where:{id}});
  
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
  
      return seller;
    }


    async getAllSellers(): Promise<SellerEntity[]> {
      return await this.sellerRepository.find();
    }
    


    async updateSellerStatus(id: number, status: string): Promise<SellerEntity | string> {
      const seller = await this.sellerRepository.findOne({where:{id}});
  
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
  
      seller.status = status;
      await this.sellerRepository.save(seller);
  
      return seller;
    }
    
    

    // Supplier part
    async saveSupplierProfile(supplierInfo: SupplierProfileInfo): Promise<SupplierProfileEntity | string> {
      try {
          // Check if the email already exists
          const existingSupplier = await this.supplierProfileRepository.findOne({ where: { gmail: supplierInfo.gmail } });

          if (existingSupplier) {
              return "Supplier with this email already exists.";
          }

          // Create a new supplier profile
          const newSupplier = new SupplierProfileEntity();
          newSupplier.name = supplierInfo.name; // Set the "namae" property
          newSupplier.gmail = supplierInfo.gmail;

          // Save the new supplier profile
          return await this.supplierProfileRepository.save(newSupplier);

      } catch (error) {
          console.error("Error saving supplier profile:", error);
          return "Error saving supplier profile.";
      }
  }


  async deleteSupplier(supplierId: number): Promise<string> {
    try {
        // Check if the supplier with the provided ID exists
        const supplier = await this.supplierProfileRepository.findOne({where:{supplierId},  relations: ['suppliedProduct'] });

        if (!supplier) {
            return "Supplier with the provided ID does not exist.";
        }

        // Delete the associated supplied products
        if (supplier.suppliedProduct && supplier.suppliedProduct.length > 0) {
          await this.suppliedProductRepository.remove(supplier.suppliedProduct);
      }

        // Delete the supplier
        await this.supplierProfileRepository.remove(supplier);

        return "Supplier deleted successfully.";
    } catch (error) {
        console.error("Error deleting supplier:", error);
        return "Error deleting supplier.";
    }
}


  async saveSuppliedProduct(supplierId: number, productInfo: SuppliedProductInfo): Promise<SuppliedProductEntity| string> {
    try {
        // Check if the supplier with the provided ID exists
        const supplier = await this.supplierProfileRepository.findOne({where:{supplierId}});

        if (!supplier) {
            return "Supplier with the provided ID does not exist.";
        }

     
      const existingProduct = await this.suppliedProductRepository.findOne({
        where: {
            product_name: productInfo.name,
            supplierProfile: supplier as any,
        },
    });

    if (existingProduct) {
        return "This product from this supplier already exists.";
    }

        // Create a new supplied product
        const newSuppliedProduct = this.suppliedProductRepository.create({
            product_name: productInfo.name,
            catergory: productInfo.category,
            supplierProfile: supplier, // Assign the supplier to the supplied product
        });

        // Save the new supplied product
        return await this.suppliedProductRepository.save(newSuppliedProduct);

    } catch (error) {
        console.error("Error saving supplied product:", error);
        return "Error saving supplied product.";
    }
}
    

}