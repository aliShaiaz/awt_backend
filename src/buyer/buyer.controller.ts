import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Session,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { Buyer } from './entities/buyer.entity';
import { BuyerLoginDto } from './dto/login-buyer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { hash } from 'bcrypt';
import { AuthGuard } from 'src/utility/authentication/auth.guard';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) { }

//------------------------------------------------------------------------


  @Post('signup')
  @UseInterceptors(
    FileInterceptor('BuyerImage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException('Invalid image format', HttpStatus.BAD_REQUEST), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './buyerImage',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    })
  )
  async signup(
    @Body() createBuyerDto: CreateBuyerDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Buyer> {
    try {
      const saltRounds = 10;
      const hashedPassword = await hash(createBuyerDto.BuyerPassword, saltRounds);

      // const imageFile = imageFile ? `/buyerImage/${imageFile.filename}` : '';

      return this.buyerService.signup(createBuyerDto, imageFile);
    } catch (error) {
      throw new HttpException('Error creating buyer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  //------------------------------------------------------------------------



  @Post('login')
  async login(@Body() buyerLoginDto: BuyerLoginDto, @Session() session) {
    const buyer = await this.buyerService.login(buyerLoginDto);
    if (buyer) {
      session.buyer = buyer.buyerEmail; // Set the session for the logged-in buyer
    }
    return buyer;
  }

  @Get('profile')
  @UseGuards(AuthGuard) // Protect this route with the AuthGuard middleware
  getProfile(@Session() session): string {
    return `Welcome, ${session.buyer}!`; // Access the session to get the logged-in buyer
  }


  //------------------------------------------------------------------------


  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  //------------------------------------------------------------------------



  @Get(':id')
  async findOne(@Param('id') id: string) {
    const buyer = await this.buyerService.findOne(+id);
    return buyer;
  }


  //------------------------------------------------------------------------


  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyerService.update(+id, updateBuyerDto);
  }


  //------------------------------------------------------------------------


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyerService.remove(+id);
  }

  //------------------------------------------------------------------------

}


declare module 'express-session' {
  interface Session {
    buyer: string; // Assuming 'buyer' is a string, adjust the type accordingly
    // You can add other session properties as needed
  }
}

//------------------------------------------------------------------------

// function postImage(arg0: any, image: any, File: any) {
//   throw new Error('Function not implemented.');
// }

