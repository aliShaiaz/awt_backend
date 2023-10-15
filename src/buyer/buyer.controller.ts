import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import multer from 'multer';




@Controller('buyer')
export class BuyerController {
  cartService: any;
  constructor(private readonly buyerService: BuyerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyerService.create(createBuyerDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        // Check if the file's original name matches the allowed extensions
        if (file.originalname.match(/\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true); // Allow the file to be uploaded
        } else {
          cb(new BadRequestException('Invalid file format'), false); // Reject the file upload
        }
      },
      limits: {
        fileSize: 30000000, // Maximum file size in bytes (30 KB in this example)
      },
      storage: diskStorage({
        destination: './uploads', // Specify the destination folder for storing files
        filename: (req, file, cb) => {
          // Define the file's new name using the current timestamp and original name
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    })
  )

  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Handle the uploaded file here
    console.log(file);
    return { message: 'File uploaded successfully' };
  }

  @Get()
  findAll() {
    return this.buyerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyerService.update(+id, updateBuyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyerService.remove(+id);
  }
}
function UserInterceptors(arg0: any): (target: BuyerController, propertyKey: "uploadFile", descriptor: TypedPropertyDescriptor<(file: Express.Multer.File) => void>) => void | TypedPropertyDescriptor<(file: Express.Multer.File) => void> {
  throw new Error('Function not implemented.');
}

