import { Body, Post,Controller,Get, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Param, Patch, Delete, UnauthorizedException, Res, Req, UseGuards, ParseIntPipe, NotFoundException, } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as bcrypt from 'bcrypt';
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminInfo } from "./dtos/admin.dto";
import { AdminEntity } from "./entitys/admin.entity";
import { Response,Request, } from 'express';
import { JwtAuthGuard } from "./jwt.guard";
import { ManagerInfo } from "./dtos/manager.dto";
import { EmailService } from "./mailer/email.service";
import { NotificationService } from "./notification/notification.service";
import { AdminProfileEntity } from "./entitys/profile.entity";
import { BuyerInfo } from "./dtos/buyer.dto";
import { SellerInfo } from "./dtos/seller.dto";
import { SupplierProfileInfo } from "./dtos/supplierProfile.dto";  
import { SuppliedProductInfo } from "./dtos/suppliedProduct.dto";
import { SuppliedProductEntity } from "./entitys/suppliedProduct.entity";
import { LoginInfo } from "./dtos/loginInfo.dto";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService,
        private readonly emailService:EmailService,
        private readonly notificationService: NotificationService){}

    // 1--> createAccount
    
    @Post('createAccount')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits:{files:10000},
        storage: diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    }))
    @UsePipes(new ValidationPipe)
    async createAccount(
        @Body() adminInfo:AdminInfo,@UploadedFile() file: Express.Multer.File
        
    ) {
        const existingUser = await this.adminService.findUserById(adminInfo.adminId);

        if (existingUser) {
            return { message: 'This user already exists' };
        }
        const hashPassword = await bcrypt.hash(adminInfo.password, 10);

        const accountData = {
            adminId: adminInfo.adminId,
            gmail: adminInfo.gmail,
            password: hashPassword,
            name: adminInfo.name,
            pic: file ? file.filename : null,
    
        };
        

        const result = await this.adminService.createAccount(accountData);

        return result;
    }


    // 2--> updateAccount

    //localhost:3000/admin/updateAccount/m1
    @UseGuards(JwtAuthGuard)
    @Patch('updateAccount/:id') // Use PATCH method for updates
    @UseInterceptors(FileInterceptor('file', { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits:{files:10000},
        storage: diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
      }))
    @UsePipes(new ValidationPipe())
    async updateAccount(
        @Param('id') adminId: string, 
        @Body() updatedInfo: Partial<AdminInfo>, 
        @UploadedFile() file: Express.Multer.File 
    )  {
    
        const existingUser = await this.adminService.findUserById(adminId);

    
    if (!existingUser) {
        return { message: 'User not found' };
    }

    const adminData: Partial<AdminEntity> = {};
    const profileData: Partial<AdminProfileEntity> = {};

    if (updatedInfo.name) {
        profileData.name = updatedInfo.name;
    }

    if (updatedInfo.gmail) {
        adminData.gmail = updatedInfo.gmail;
    }
    if(updatedInfo.password){
        const hashPassword = await bcrypt.hash(updatedInfo.password, 10);
        adminData.password = hashPassword;
    }

    if (file) {
        profileData.pic = file.filename;
    }

        const result = await this.adminService.updateUser(adminId, adminData, profileData);

        return result; 
    }


    //3-->> delete admin account along with all associater manager
    @UseGuards(JwtAuthGuard)
    @Delete('deleteAccount/:id')
  async deleteAccount(@Param('id') adminId: string) {
    try{
    await this.adminService.deleteAccount(adminId);
    }catch (error) {
        console.error("Error is:", error);
        return "Something went wrong";
    }
   }


   //4--> login

   @Post('login')
   @UsePipes(new ValidationPipe)
     async login(
        // @Body('adminId') adminId: string,
        // @Body('password') password: string,
         @Body() loginInfo:LoginInfo,
        @Res() response: Response, 
        ) 
        {
          try{
               
         const adminId = loginInfo.adminId;
         const password = loginInfo.password;
                
         console.log(adminId,password);
                
         const validAdmin = await this.adminService.isAdminExists(adminId); 
         console.log(validAdmin); 
        if(validAdmin){
         const token = await this.adminService.login(adminId, password);
         console.log("token:"+token);
                
         if (token) {
         response.cookie('token', token, { httpOnly: true }); // Set JWT as a cookie
        //  return response.send('Login successful');
         return response.send(token);
         } else {
         return response.send('Invalid username or password');
         }
         }
         else{
            return response.send('This user does not exist!');
         }
         }catch (error) {
         console.error("Error in controller:", error);
         return "Something went wrong";
        }
        
    }


     // 5--> Logout
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Res() response: Response) {
        try{
        response.clearCookie('token'); // Clear the JWT cookie
        return response.send('Logout successfully');
        }catch (error) {
            console.error("Error is:", error);
            return "Something went wrong";
        }
    }




// 6--> Add Manager
    @UseGuards(JwtAuthGuard)
    @Post('addManager')
    @UsePipes(new ValidationPipe)
    async addManager(
    @Body() managerData: ManagerInfo,
    @Req() request: Request,
    ) {
        try{
    const managerExist = await this.adminService.managerExist(managerData.managerId);
    if (!managerExist) {
        const token = request.cookies['token'];
        const result = await this.adminService.addManager(token, managerData);
       

         await this.notificationService.sendNotificationToAdmin(managerData.managerId, token);
        

        return result; 
    }
    console.log(managerExist);
  
    return "This manager already exists!";
      }catch (error) {
        console.error("Error is:", error);
        return "Something went wrong";
    }
    }



    // 7 --> Delete manager by Id

    @UseGuards(JwtAuthGuard)
    @Delete('deleteManager/:id')
         async deleteManager(@Param('id') managerId: string) {
            try {
                console.log(managerId);
                  const message = await this.adminService.deleteManager(managerId);
                 return { message };
            }catch (error) {
                console.error("Error is:", error);
                return "Something went wrong";
            }
    }
//..................................................................................
//     @UseGuards(JwtAuthGuard)
//     @Get('getManagerById/:managerId')
//     async getManagerById(@Param('managerId') managerId: string) {
//      const managers = await this.adminService.findManagerById(managerId);
//         return { managers };
//    }
//...............................................................................

    // 8 -->  Get all manager

    @UseGuards(JwtAuthGuard)
    @Get('getAllManagers')
    async getAllManagers() {
        try{
        const managers = await this.adminService.getAllManagers();
        return { managers };
        }catch (error) {
            console.error("Error is:", error);
            return "Something went wrong";
        }
     }


     // 9--> Get a manager by ID
    @UseGuards(JwtAuthGuard)
    @Get('getManagerById/:managerId')
    async getManagerById(@Param('managerId') managerId: string) {
     const managers = await this.adminService.getManagerById(managerId);
        return { managers };
   }

     // 10--> Comunicate with manager throw Email
    @UseGuards(JwtAuthGuard)
    @Post('sendMail/:managerId')
     async sendMail(
     @Param('managerId') managerId: string,
     @Body('subject') subject: string, 
     @Body('text') text: string, 
     ) {
        try{
     const manager = await this.adminService.managerById(managerId);

    if (manager && manager.gmail) {
      const to = manager.gmail;
      console.log(to);
      

      await this.emailService.sendMail(to, subject, text); 

      return { message: 'Email sent successfully' };
    } else {
      return { message: 'Manager or Admin not found' };
    }
     }catch (error) {
        console.error("Error is:", error);
        return "Something went wrong";
    }
    }

    // 11--> Un/mute (On/Off) notification

    @UseGuards(JwtAuthGuard)
    @Patch('notificationStatus/:status')
    async setNotificationStatus(@Param('status') status:string,
    @Req() request: Request){
        const token = request.cookies['token'];
        console.log(token);
        const admin = this.adminService.setNotificationStatus(token,status.toLowerCase())
        return admin;
    }

    @UseGuards(JwtAuthGuard)
    @Post('addBuyer')
    @UsePipes(new ValidationPipe)
    async addBuyer(@Body() buyerData: BuyerInfo) {
     try {
      const buyer = await this.adminService.addBuyer(buyerData);
      return buyer;
      } catch (error) {
      return { message: error.message };
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get('getAllBuyers')
    async getAllBuyers() {
      const buyers = await this.adminService.getAllBuyers();
      return { buyers };
    }


    @UseGuards(JwtAuthGuard)
    @Post('createSeller')
    @UsePipes(new ValidationPipe)
    async createSeller(@Body() createSellerDto: SellerInfo) {
        try{
            return await this.adminService.createSeller(createSellerDto);
        } catch(error){
            if(error instanceof Error){
                return { message: error.message }
            }
            throw error;
        }
      
    }

    @UseGuards(JwtAuthGuard)
    @Get('getSellerById/:id')
    async getSellerById(@Param('id',ParseIntPipe) id: number) {
      try {
        const seller = await this.adminService.findSellerById(id);
        return seller;
      } catch (error) {
        if (error instanceof NotFoundException) {
          return { message: error.message };
        }
        throw error;
      }
    }



    @UseGuards(JwtAuthGuard)
    @Get('getAllSeller')
    async getAllSellers() {
      return await this.adminService.getAllSellers();
    }



    @UseGuards(JwtAuthGuard)
    @Patch('changeSellerStatus/:id')
    async updateSellerStatus(
    @Param('id',ParseIntPipe) id: number,
    @Body('status') status: string,
    ) {
     try {
      const updatedSeller = await this.adminService.updateSellerStatus(id, status);
      return updatedSeller;
     } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
     }
    }
    

    // Supplier part



    @UseGuards(JwtAuthGuard)
    @Post('addSupplier')
    @UsePipes(new ValidationPipe)
    async saveSupplierProfile(@Body() supplierInfo: SupplierProfileInfo) {
        try {
            const result = await this.adminService.saveSupplierProfile(supplierInfo);
            return result;
        } catch (error) {
            console.error("Error in saveSupplierProfile:", error);
            return "Error saving supplier profile.";
        }
    }


    @UseGuards(JwtAuthGuard)
    @Delete('deleteSupplier/:supplierId')
    async deleteSupplier(@Param('supplierId') supplierId: number): Promise<string> {
        try {
            const result = await this.adminService.deleteSupplier(supplierId);
            return result;
        } catch (error) {
            console.error("Error in deleteSupplier:", error);
            return "Error deleting supplier.";
        }
    }


    @UseGuards(JwtAuthGuard)
    @Post('saveSuppliedProduct/:supplierId')
    @UsePipes(new ValidationPipe)
    async saveSuppliedProduct(@Param('supplierId') supplierId: number, @Body() productInfo: SuppliedProductInfo): Promise<SuppliedProductEntity| string> {
        try {
            const result = await this.adminService.saveSuppliedProduct(supplierId, productInfo);
            return result;
        } catch (error) {
            console.error("Error in saveSuppliedProduct:", error);
            return "Error saving supplied product.";
        }
    }


}