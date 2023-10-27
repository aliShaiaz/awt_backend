import { Body, Post,Controller,Get, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, } from "@nestjs/common";
import { AdminService } from "./admin.service";
import * as bcrypt from 'bcrypt';
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminInfo } from "./dtos/admin.dto";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    @Get()
    getAdmin(): string{
        return this.adminService.getAdmin();
    }



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
        const existingUser = await this.adminService.findUserById(adminInfo.id);

        if (existingUser) {
            return { message: 'This user already exists' };
        }
        const hashPassword = await bcrypt.hash(adminInfo.password, 10);

        const accountData = {
            id: adminInfo.id,
            name:adminInfo.name,
            gmail: adminInfo.gmail,
            password: hashPassword,
            pic: file ? file.filename : null,
        };

        const result = await this.adminService.createAccount(accountData);

        return result;
    }


}