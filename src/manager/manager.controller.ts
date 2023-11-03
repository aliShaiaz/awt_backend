import { Controller, Get, Post, Body, Param, Delete, Session, UseGuards, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerSignUpDto } from './dto/manager-signup.dto';
import { Manager } from './entities/manager.entity';
import { ManagerSignInDto } from './dto/manager-signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

///////////////////////////////////////////////////////////////////////////
 
@Post('signup')
  async signup(@Body() managerSignUpDto: ManagerSignUpDto): Promise<{ manager: Manager }> {
    return { manager: await this.managerService.signup(managerSignUpDto) };
  }

  @Post('signin')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('session'))
  remove(@Param('id') id: string,@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.managerService.remove(+id);
  }
}


declare module 'express-session' {
  interface Session {
    manager: string; 
  }
}