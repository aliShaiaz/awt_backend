import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UploadedFile, UseInterceptors, UseGuards, Request, UploadedFiles } from '@nestjs/common';

import { CreateSellerDto } from './dto/seller/create-seller.dto';
import { UpdateSellerDto } from './dto/seller/update-seller.dto';
import { Seller } from './entities/seller.entity';
////////////////////
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
import { SellerService } from './seller.service';
import { Product } from './entities/product/product.entity';
import { AvailableQuality } from './entities/product/availableQuality.entity';
import { CreateAvailableQualityOfAProductDto } from './dto/product/create-available-quality.dto';
import { Specification } from './entities/product/specificaiton.entity';
import { Review } from './entities/product/review/review.entity';
import { CreateReviewDto } from './dto/product/review/create-review.dto';
import { CreateReviewReplyDto } from './dto/product/review/create-reviewReply.dto';
import { ReviewReply } from './entities/product/review/reviewReply.entity';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/seller-auth/local/local-auth.guard';



@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  /**
   * 1. user jodi emon kono product search kore .. jeta 
   *          ->  available na .. 
   *          -> available but low quantity .. 
   *    -> then seller er kase notification jabe .. 
   */

  @Get('sendEmail')
  sendEmail (){
    const to = "djxyz99@gmail.com";
    const emailSubject = "test1";
    const emailBody = "test 2";
    this.sellerService.sendEmail(to, emailSubject,emailBody);
  }
  

  // 9 🔰 send notification to seller as a products available quality value is same as lowest value to stock 
  //🟢🟢
  @Get('checkForLowQuantity') // Almost Stock Out .. 🔰 Low Quantity 
  checkForLowQuantity(){
    // joto gula product low quantity .. tar ekta list dibe .. 
    //console.log("WE ARE IN CONTROLLER ----------")
    return this.sellerService.checkForLowQuantity();
  }

  // 10 🟢🟢 give product id, who has negetive review .. also, give me those negetive review 
  @Get('getAllNegetiveReview')
  getAllNegetiveReview(){
    return this.sellerService.getAllNegetiveReview();
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

   //14 🟢🟢🔴 // review add korar pore problem kortese 
   @Get('getAllProductsDetails')
   async getAllProductsDetails() : Promise<Product[]>{
    return await this.sellerService.getAllProductsDetails();
   }


   // 16 🟢🟢
   @Post('addReview')
   async addReviewToAProduct(@Body() createReviewDto : CreateReviewDto) : Promise<Review>{
    return await this.sellerService.addReviewToAProduct(createReviewDto);
   }

   // 17 🟢🟢
   @Post('addReplyToAReview')
   async addReplyToAReview(@Body() createReviewReplyDto : CreateReviewReplyDto) : Promise<ReviewReply>{
    return await this.sellerService.addReplyToAReview(createReviewReplyDto);
   }


  
  
  //1 🔰create new seller 🟢🔴

  //@UsePipes(new ValidationPipe())// Apply the validation
  @Post()// 📃7
  create(@Body() createSellerDto: CreateSellerDto, ) {
    console.log("WE ARE IN CONTROLLER ----------")
    return this.sellerService.create(createSellerDto);
  }

  
 ////////////////////////////////////////////////////////////////////////////////////////////

  

  //2 🔰get all seller 🟢🟢
  @Get()// 📃6
  async findAll() : Promise<Seller[]> {
    return this.sellerService.findAll();
  }

  
  //3 🔰 get one seller by id 🟢🟢
  @Get(':id')// 📃5
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Seller> {
    return this.sellerService.findOne(id);
  }

  //4 🔰 update a sellers information 🟢🟢🔴 kichu logic add korte hobe 
  @Patch(':id')// 📃4
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  //5 delete a seller  🟢🟢 done
  @Delete(':id') // 📃3
  remove(@Param('id', ParseIntPipe) id: number) {
    // 🔰 logged in user tar account delete korte parbe 
    return this.sellerService.remove(id);
  }

  // 6 🔰 seller login 🔴
  // @UseGuards(AuthGuard('local'))
  // @Post('sellerLogin')// 📃2
  // sellerLogin(@Body() loginSellerDto) {
  //   return this.sellerService.sellerLogin(loginSellerDto);
  // }

  // 6 🔰 seller login >> local-strategy 🟢
  @UseGuards(LocalAuthGuard)
  @Post('sellerLogin')// 📃2
  sellerLogin(@Request() req) {
    return this.sellerService.sellerLogin(req);
  }

  // 7 🔰 seller login >> JWT 🟢
  // @UseGuards(JwtAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Post('sellerLoginJWT')// 📃2
  sellerLoginJWT(@Request() req) {
    return this.sellerService.sellerLoginWithJWT(req);
  }


  // 8 🔰 Create a new Product 🟢🔴
   
  @Post('createProduct')// 📃1
  async createNewProduct(@Body() createProductDto) : Promise<Product> {
    console.log("------------------- from controller -------------------");
    return await this.sellerService.createNewProduct(createProductDto);
  }

  // 13 🟢🟢
  @Post('addAvailableQualityOfAProduct')
  async addAvailableQualityOfAProduct(@Body() createAvailableQualityOfAProductDto : CreateAvailableQualityOfAProductDto) : Promise<AvailableQuality> {
    return await this.sellerService.addAvailableQualityOfAProduct(createAvailableQualityOfAProductDto);
  }

  // 15 🟢🟢
  @Post('addSpecificationOfAProduct')
  async addSpecificationOfAProduct(@Body() addSpecificationOfAProductDto : CreateAvailableQualityOfAProductDto) : Promise<Specification> {
     // kono ekta category er product er jonno specification er title gula show korbe 
  // so, kono ekta category er product er jonno specification title add korte hobe .. 

    return await this.sellerService.addSpecificationOfAProduct(addSpecificationOfAProductDto);
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
    console.log("================ in controller======")
    //this.sellerService.postImage(file);
  }

  
  
  
  @Post('uploadAgain')
  // 🟢 for single file upload 
  // @UseInterceptors(
  //   FileInterceptor('sellerImage', 
  // { fileFilter: (req, file, cb) => {
  //         if (file.originalname.match(/^.*\.(jpg)$/))
  //         cb(null, true);
  //         else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //         }
  // },
  // limits: { fileSize: 9000000 },
  // storage:diskStorage({
  // destination: './uploads',
  // filename: function (req, file, cb) {
  // cb(null,Date.now()+file.originalname)
  // },
  // })
  // }), 
  // )
  // 🟢 for multiple file upload // maxCount 1
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'sellerImage', maxCount: 1 },
    { name: 'shopLogo', maxCount: 1 },
  ],{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg)$/))
    cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
},
limits: { fileSize: 9000000 },
storage:diskStorage({
destination: './uploads',
filename: function (req, file, cb) {
cb(null,Date.now()+file.originalname)
},
})
}))
  //uploadAgain(@UploadedFile() sellerImage: Express.Multer.File, @UploadedFile() shopLogo: Express.Multer.File, @Body() createSellerDto: CreateSellerDto): void
  uploadAgain(
    @UploadedFiles() files: {
      sellerImage?: Express.Multer.File[],
      shopLogo?: Express.Multer.File[] 
    }, @Body() createSellerDto: CreateSellerDto): void
  {
   this.sellerService.uploadAgain(files.sellerImage,files.shopLogo, createSellerDto);
    
  }
  

}
