import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, UseInterceptors } from '@nestjs/common';

import { CreateSellerDto } from './dto/seller/create-seller.dto';
import { UpdateSellerDto } from './dto/seller/update-seller.dto';
import { Seller } from './entities/seller.entity';
////////////////////
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
import { SellerService } from './seller.service';



@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // 9 🔰 send notification to seller as a products available quality value is same as lowest value to stock 

  // 8 📃
  @Get('checkForStockLess') // Almost Stock Out .. 🔰 Low Quantity 
  checkForStockAndsendStockLessNotification(){
    console.log("WE ARE IN CONTROLLER ----------")
    return this.sellerService.checkForStockAndsendStockLessNotification();
  }

  // 10🔰 give product id, who has negetive review .. also, give me those negetive review 
  @Get('getNegetiveReview')// 9 📃
  getNegetiveReview(){
    return this.sellerService.getNegetiveReview();
  }

  // 11🔰 give pre order information , if OrderStatus is Pending

  @Get('orderStatusPending') // 10 📃
  getOrderStatusPending(){
    return this.sellerService.getOrderStatusPending();
  }

  // 12🔰 give pre order information , if Payment is complete  

  @Get('paymentCompleteOfPreOrder')
  getPaymentCompleteStatusOfPreOrder(){
    return this.sellerService.getPaymentCompleteStatusOfPreOrder();
  }

  
  //1 🔰create new seller 🟢🟢

  //@UsePipes(new ValidationPipe())// Apply the validation
  @Post()// 📃7
  create(@Body() createSellerDto: CreateSellerDto, ) {
    return this.sellerService.create(createSellerDto);
  }

  


  @Post('withImage')
  createWithImage(@Body() createSellerDto: CreateSellerDto, @UploadedFile() file: Express.Multer.File) {
    return this.sellerService.createWithImage(createSellerDto, file);
  }

  //2 🔰get all seller 🟢 done again
  @Get()// 📃6
  async findAll() : Promise<Seller[]> {
    return this.sellerService.findAll();
  }

  ////////////// ✅✅✅✅✅✅✅✅✅✅✅✅ 2. Transformation
  //3 🔰 get one seller by id 🟢 done
  @Get(':id')// 📃5
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Seller> {
    return this.sellerService.findOne(id);
  }

  //4 🔰 update a sellers information 🟢 done
  @Patch(':id')// 📃4
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  //5 delete a seller  🟢 done
  @Delete(':id') // 📃3
  remove(@Param('id', ParseIntPipe) id: number) {
    // 🔰 logged in user tar account delete korte parbe 
    return this.sellerService.remove(id);
  }

  // 6 🔰 seller login 🟢 done partially
  @Post('sellerLogin')// 📃2
  sellerLogin(@Body() loginSellerDto) {
    return this.sellerService.sellerLogin(loginSellerDto);
  }


  // 8 🔰 Create a new Product
   
  @Post('createProduct')// 📃1
  createNewProduct(@Body() createProductDto) {
    return this.sellerService.createNewProduct(createProductDto);
  }

   //////////////////////////////  🔰 seller logout
   //////////////////////////////  🔰 seller forgot password 

   //////////////////////////////  🔰 send notification to seller as a products stock value is so high that .. it should need some promotion
   //////////////////////////////  🔰 give promotion about a product whose stock value is so low, and there is product shortage of that product
  

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', 
  { fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg)$/))
  cb(null, true);
  else {
  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  }
  },
  limits: { fileSize: 100000 },
  storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
  cb(null,Date.now()+file.originalname)
  },
  })
  }))
  postImage(@UploadedFile() file: Express.Multer.File): void
  {
    this.sellerService.postImage(file);
    
  }
  


  

}
