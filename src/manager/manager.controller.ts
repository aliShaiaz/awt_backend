import { Controller, Get, Post, Body, Param, Delete, Session, UseGuards, Patch, HttpException, HttpStatus, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerSignUpDto } from './dto/manager-signup.dto';
import { Manager } from './entities/manager.entity';
import { ManagerSignInDto } from './dto/manager-signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage as multerDiskStorage } from 'multer';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

///////////////////////////////////////////////////////////////////////////
 
@Post('signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('managerimage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(
            new HttpException('Invalid image format', HttpStatus.BAD_REQUEST),
            false
          );
        }
      },
      limits: { fileSize: 3000000 },
      storage: multerDiskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    })
  )


  async signup(
    @Body() managerSignUpDto: ManagerSignUpDto,
    @UploadedFile() imageFile: Express.Multer.File
  ): Promise<Manager> {
    try {
      const manager = await this.managerService.signup(managerSignUpDto, imageFile);
      return manager;
    } catch (error) {
      throw new HttpException('Error creating manager', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() managerSignInDto: ManagerSignInDto, @Session() session) {
    const manager = await this.managerService.signin(managerSignInDto);
    if (manager) {
      session.manager = manager.email; // Set the session for the logged-in manager
    }
    return manager;
  }

//////////////////////////////////////////////////////////////////////////
 
@Get('profile')
  @UseGuards(AuthGuard('session')) // Protect this route with the AuthGuard middleware
  getProfile(@Session() session): string {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return `Welcome, ${session.manager}!`; // Access the session to get the logged-in buyer
  }

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
    
  }

  @Get('all')
  @UseGuards(AuthGuard('session'))
  async findAll(@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return await this.managerService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('session'))
  async findOne(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return await this.managerService.findOne(+id);
  }

  @Patch('update')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('session'))
  update( @Body() updateManagerDto: UpdateManagerDto, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    
    return this.managerService.updateManager(updateManagerDto, session.manager);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('session'))
  remove(@Param('id') id: string,@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.managerService.remove(+id);
  }
}

// Extend the express-session module to include a 'manager' property in the session
declare module 'express-session' {
  interface Session {
    manager: string; 
  }
}

// Placeholder function for diskStorage (to be implemented if needed)
function diskStorage(arg0: { destination: string; filename: (req: any, file: any, cb: any) => void; }): any {
  throw new Error('Function not implemented.');
}

// Placeholder function for hash (to be implemented if needed)
function hash(ManagerPassword: any, saltRounds: number) {
  throw new Error('Function not implemented.');
}

