import { Body, Post,Controller,Get, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Param, Patch, Delete, UnauthorizedException, Res, Req, UseGuards, } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as bcrypt from 'bcrypt';
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminInfo } from "./dtos/admin.dto";
import { AdminEntity } from "./entitys/admin.entity";
import { Response,Request } from 'express';
import { JwtAuthGuard } from "./jwt.guard";
import { ManagerInfo } from "./dtos/manager.dto";
  

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}


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
            name:adminInfo.name,
            gmail: adminInfo.gmail,
            password: hashPassword,
            pic: file ? file.filename : null,
        };

        const result = await this.adminService.createAccount(accountData);

        return result;
    }


    // 2--> updateAccount

    //localhost:3000/admin/updateAccount/m1
    @Patch('updateAccount/:id') // Use PATCH method for updates
    @UseInterceptors(FileInterceptor('file', { /* file upload config here */ }))
    @UsePipes(new ValidationPipe())
    async updateAccount(
        @Param('id') adminId: string, // Retrieve the user ID from the route parameter
        @Body() updatedInfo: Partial<AdminInfo>, // Use Partial to allow partial updates
        @UploadedFile() file: Express.Multer.File // If you're also updating the file
    )  {
    
        const existingUser = await this.adminService.findUserById(adminId);
    
    if (!existingUser) {
        return { message: 'User not found' };
    }

    const updatedData: Partial<AdminEntity> = {}; // Create an object to store updated data

    if (updatedInfo.name) {
        updatedData.name = updatedInfo.name;
    }

    if (updatedInfo.gmail) {
        updatedData.gmail = updatedInfo.gmail;
    }

    if (file) {
        updatedData.pic = file.filename;
    }

        const result = await this.adminService.updateUser(adminId, updatedData);

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
        //@Body() loginData: AdminInfo,
        @Res() response: Response, // Inject Response
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
        //return 'Logout successful';
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
          const managerExist = await this.adminService.managerExist(managerData.managerId);
          if(managerExist){
            
            const token = request.cookies['token'];
            const result = await this.adminService.addManager(token, managerData);

            return result; 
          }
          console.log(managerExist);
        
          return "This manager already exist!"
          
          
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



}