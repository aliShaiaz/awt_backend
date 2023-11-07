import { Body, Post,Controller,Get, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Param, Patch, Delete, UnauthorizedException, Res, Req, UseGuards, } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as bcrypt from 'bcrypt';
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminInfo } from "./dtos/admin.dto";
import { AdminEntity } from "./entitys/admin.entity";
import { Response,Request, request } from 'express';
import { JwtAuthGuard } from "./jwt.guard";
import { ManagerInfo } from "./dtos/manager.dto";
import { EmailService } from "./mailer/email.service";
import { NotificationService } from "./notification/notification.service";
import { AdminProfileEntity } from "./entitys/profile.entity";
  

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
        // const profileData = {
        //     name:adminInfo.name,
        //     pic: file ? file.filename : null,
        //     admin: accountData
            
        // };

        const result = await this.adminService.createAccount(accountData);

        return result;
    }


    // 2--> updateAccount

    //localhost:3000/admin/updateAccount/m1
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


    // 3-->> delete admin account along with all associater manager
    @Delete('deleteAccount/:id')
  async deleteAccount(@Param('id') adminId: string) {
    await this.adminService.deleteAccount(adminId);
  }


   //4--> login

    @Post('login')
   @UsePipes(new ValidationPipe)
     async login(
        @Body('adminId') adminId: string,
        @Body('password') password: string,
        @Res() response: Response, 
        ) {
          
        const token = await this.adminService.login(adminId, password);

        if (token) {
        response.cookie('token', token, { httpOnly: true }); // Set JWT as a cookie
        //return 'Login successful';
        return response.send('Login successful');
        } else {
        throw new UnauthorizedException('Invalid credentials');
        }
    }


     // 5--> Logout
    @Post('logout')
    logout(@Res() response: Response) {
        response.clearCookie('token'); // Clear the JWT cookie
        return response.send('Logout successfully');
    }




// 6--> Add Manager
    @UseGuards(JwtAuthGuard)
    @Post('addManager')
    @UsePipes(new ValidationPipe)
    async addManager(
    @Body() managerData: ManagerInfo,
    @Req() request: Request,
    ) {
    console.log('hi');
    const managerExist = await this.adminService.managerExist(managerData.managerId);
    if (!managerExist) {
        const token = request.cookies['token'];
        const result = await this.adminService.addManager(token, managerData);

      // Sending notification when a new manager added
        await this.notificationService.sendNotificationToAdmin(managerData.managerId, token);

        return result; 
    }
    console.log(managerExist);
  
    return "This manager already exists!";
    }



    // 7 --> Delete manager by Id

    @UseGuards(JwtAuthGuard)
    @Delete('deleteManager/:id')
         async deleteManager(@Param('id') managerId: string) {
         const message = await this.adminService.deleteManager(managerId);
         return { message };
    }


    // 8 -->  Get all manager

    @UseGuards(JwtAuthGuard)
    @Get('getAllManagers')
    async getAllManagers() {
     const managers = await this.adminService.getAllManagers();
        return { managers };
     }


     // 9--> Get a manager by ID
     @UseGuards(JwtAuthGuard)
    @Get('getManagerById/:managerId')
    async getManagerById(@Param('managerId') managerId: string) {
     const managers = await this.adminService.getManagerById(managerId);
        return { managers };
   }

     // 10--> Comunicate with manager throw Email
    @Post('sendMail/:managerId')
     async sendMail(
     @Param('managerId') managerId: string,
     @Body('subject') subject: string, 
     @Body('text') text: string, 
     ) {
     const manager = await this.adminService.managerById(managerId);

    if (manager && manager.gmail) {
      const to = manager.gmail;
      console.log(to);
      

      await this.emailService.sendMail(to, subject, text); 

      return { message: 'Email sent successfully' };
    } else {
      return { message: 'Manager or Admin not found' };
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


    



}