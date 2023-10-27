import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller/create-seller.dto';
import { UpdateSellerDto } from './dto/seller/update-seller.dto';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product/product.entity';
import { ReviewCategoryEnum } from './model/review.model';
import { Order } from './entities/order.entity';
import { OrderStatusEnum, PaymentStatusEnum } from './model/preOrder.model';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AvailableQuality } from './entities/product/availableQuality.entity';
import { Specification } from './entities/product/specificaiton.entity';
import { Review } from './entities/product/review/review.entity';
import { ReviewReply } from './entities/product/review/reviewReply.entity';
import { SellerAuthService } from 'src/seller-auth/seller-auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

// Status📃(total: problem : )
@Injectable()
export class SellerService {

  constructor(
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(AvailableQuality) private availableQualitysRepository: Repository<AvailableQuality>,
    @InjectRepository(Specification) private availableSpecificaitonsRepository: Repository<Specification> ,
    @InjectRepository(Review) private reviewsRepository: Repository<Review> ,
    @InjectRepository(ReviewReply) private reviewRepliesRepository: Repository<ReviewReply> ,
      private sellerAuthService: SellerAuthService,
      private mailerService: MailerService

    ){}

  /*
      //🟢 category should be another table / entity .. product and category should have .... relationship 
        category -> id , name 
      */

  
  // private notifications: Notification[] = [
  //   {
  //     notificationId : 1,
  //     notificationDetails : 'notification1',
  //   },
  // ];

  // 1 done // 🟢🔴
  async create(createSellerDto: CreateSellerDto) : Promise<Seller> {
    let newSeller;
    let sellerPassword = createSellerDto.sellerPassword;
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(sellerPassword, salt);
    console.log("hassed password : ",hassedpassed);
    if(createSellerDto.id){
      newSeller = {
        ...createSellerDto,
        sellerPassword: hassedpassed
      }
    }else{
      newSeller = {
        id: Date.now(), 
        ...createSellerDto,
        sellerPassword: hassedpassed}
    }
    
    await this.sellersRepository.save(newSeller);
    return newSeller;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  async uploadAgain(sellerImage,shopLogo, createSellerDto){
    //console.log(" In service ==, file", sellerImage); // shopLogo

    const sellerImageFileName = sellerImage.map(sellerImage => sellerImage.filename)
    const shopLogoFileName = shopLogo.map(shopLogo => shopLogo.filename)
    

    const sellerImageFileNameString = sellerImageFileName.toString();
    const shopLogoFileNameString = shopLogoFileName.toString();


    let sellerPassword = createSellerDto.sellerPassword;
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(sellerPassword, salt);
    console.log("hassed password : ",hassedpassed);

    let newSeller;
    if(createSellerDto.id){
      newSeller = {
        ...createSellerDto,
         sellerImage: sellerImageFileNameString,
         shopLogo: shopLogoFileNameString,
         sellerPassword: hassedpassed
        
      };
    }else{
      newSeller = {
        id: Date.now(), 
        ...createSellerDto,
         sellerImage: sellerImageFileNameString, 
         shopLogo: shopLogoFileNameString,
         sellerPassword: hassedpassed
      }
    }
    //
    this.sellersRepository.save(newSeller);
  }
//////////////////////////////////////////////////////////
  async getShopLogo(sellerId){
    //
    console.log("in service => sellerId", sellerId)
    const user =  await this.sellersRepository.findOne({ //🟢 findOneOrFail use korte hobe ..
      where: {id : sellerId} // 🤔😥 // it means {id : id}
    });
    
    // extract shoplogo 
    let sellerImage;
    let sellerShopLogo;
    if(user){
       sellerShopLogo = await user.shopLogo;
       sellerImage = await user.sellerImage;
    }
    console.log(sellerShopLogo,"----",sellerImage)
    return sellerShopLogo;
  }
  

  // 2 🟢🟢
  async findAll() : Promise<Seller[]> {
    //return [];
    return await this.sellersRepository.find();
    //return this.sellers;
  }

  // 3 done //  🟢🟢
  async findOne(id: number) : Promise<Seller> {
    if(id != null && id != undefined){
      return await this.sellersRepository.findOne({ //🟢 findOneOrFail use korte hobe ..
        where: {id} // 🤔😥 // it means {id : id}
      });
    }
    //return this.sellers.find(seller => seller.id == id);
  }

  // this is for jwt authentication login .. called in seller-auth.service.ts
  async findOneByEmail(email: string): Promise<Seller> {
    if (email != null && email != undefined) {
        try {
            return await this.sellersRepository.findOneOrFail({
                where: { sellerEmailAddress : email }
            });
        } catch (error) {
            // Handle the error when the seller with the given email is not found.
            throw new Error(`Seller with email ${email} not found`);
        }
    }
    // Handle the case when email is null or undefined (optional).
    return null;
}

  // 4 done 🟢🔴 // kichu field er logic add korte hobe .. kono error nai 
  async update(id: number, updateSellerDto: UpdateSellerDto) : Promise<Seller | string>  {
    // let seller = this.sellers.find(seller => seller.id === id);
    // seller = {...seller, ...updateSellerDto}; // ⭕ Industry te bad practice 
    const seller = await this.findOne(id); //🟢 findOneOrFail use korte hobe ..
    console.log("///////////////////////////////////",seller)
    console.log("///////////////////////////////////",id,updateSellerDto)
    if(seller == undefined){
      throw new NotFoundException();
    }
    if (seller){

      // better hoito ekta object banaye .. sheta return kora .. 
      

      if(updateSellerDto.id){
        seller.id = seller.id;  
         
      }
      if(updateSellerDto.sellerName){
        seller.sellerName = updateSellerDto.sellerName;
      }
      if(updateSellerDto.sellerEmailAddress){
        seller.sellerEmailAddress = updateSellerDto.sellerEmailAddress;
      }
  
      if(updateSellerDto.sellerPassword){
        seller.sellerPassword = updateSellerDto.sellerPassword;
      }
      // if(updateSellerDto.sellerPhoneNumber){
      //   seller.sellerPhoneNumber = updateSellerDto.sellerPhoneNumber;
      // }
      if(updateSellerDto.sellerDescription){
        seller.sellerDescription = updateSellerDto.sellerDescription;
      }
      if(updateSellerDto.shopDescription){
        seller.shopDescription = updateSellerDto.shopDescription;
      }
      if(updateSellerDto.shopName){
        seller.shopName = updateSellerDto.shopName;
      }
      if(updateSellerDto.shopDescription){
        seller.shopDescription = updateSellerDto.shopDescription;
      }
      if(updateSellerDto.status){
        seller.status = updateSellerDto.status;
      }
      
      // reviewReplies[] er upor map kora jacche na .. 
      // 🔴🔴🔴🔴 pore check korte hobe ..       
      
      
      //return seller;

      // await this.sellersRepository.update(id, seller);
      await this.sellersRepository.save(seller);
      return this.findOne(id); // 😥
    }
    
    return `Cant find that User`;
  }

  // 5 done 🟢🟢
  async remove(id: number) : Promise<Seller> { // DeleteResult rakha jabe na 

    // this method is used for delete array element
    // const newArray =  this.sellers.filter(seller => seller.id !== id); // this actually returns new array 
    //this.sellers = newArray;
    
    const sellerToDeleted = await this.findOne(id); // string or number ? 😥

    if(sellerToDeleted == undefined){
      throw new NotFoundException();
    }
    return this.sellersRepository.remove(sellerToDeleted); // delete method use kora jabe na 
    
    
    //return this.sellers;
    
  }

  // 6 done fully🔴
  sellerLogin(req){ 
    
    // const seller = this.sellers.find(seller => seller.sellerEmailAddress == loginSellerDto.sellerEmailAddress && seller.sellerPassword == loginSellerDto.sellerPassword);
   
    // if(seller){
    //   const {id} = seller; // id destructure korlam 

    //   // id destructure kore id return korte pari .. 
    //   return 2;
    // }
    
    return req.user;
  }

  sellerLoginWithJWT(req){
    return this.sellerAuthService.loginWithJWT(req.user);
  }

  //8 🟢🔴 // id cant assign manually .. id set automatically
  async createNewProduct(createProductDto) : Promise<Product>{
    let newProduct;
    
    if(createProductDto.id){
      // newProduct = { id : createProductDto.id, ...createProductDto}// 🔴id cant assign manually
      newProduct = {...createProductDto}
    }else{
     
      newProduct = {id: Date.now(), ...createProductDto}
    }
    // 🛡️🛡️🛡️this.products.push(newProduct)
    console.log(newProduct);
    await this.productsRepository.create(newProduct);
    await this.productsRepository.save(newProduct);
    
    return newProduct;
  }


  // 13 🟢🟢
  addAvailableQualityOfAProduct(createAvailableQualityOfAProductDto){
    this.availableQualitysRepository.create(createAvailableQualityOfAProductDto);
    this.availableQualitysRepository.save(createAvailableQualityOfAProductDto);
    // return {
    //   message : `New Available Quality Added`,
    //   data : createAvailableQualityDto,
    // }
    return createAvailableQualityOfAProductDto;
  }

  // 14 🟢🟢
  async getAllProductsDetails(){

    return await this.productsRepository.find();
  }

  // 15 🟢🟢
  async addSpecificationOfAProduct(addSpecificationOfAProductDto){
     // kono ekta category er product er jonno specification er title gula show korbe 
  // so, kono ekta category er product er jonno specification title add korte hobe .. 

    this.availableSpecificaitonsRepository.create(addSpecificationOfAProductDto);
    this.availableSpecificaitonsRepository.save(addSpecificationOfAProductDto);
    
    return addSpecificationOfAProductDto;
  }


  // 16  🟢🟢

  async addReviewToAProduct(createReviewDto){
    const newReview = {...createReviewDto} ;
    this.reviewsRepository.create(newReview);
    this.reviewsRepository.save(newReview);
    // 🔴 error handle kora hoy nai 
    return newReview;
    // return 
  }

  // 17 🟢🟢 
  async addReplyToAReview(createReviewReplyDto){
    
    let newReviewReply = {...createReviewReplyDto} ;
    this.reviewRepliesRepository.create(newReviewReply);
    this.reviewRepliesRepository.save(newReviewReply);
    // 🔴 error handle kora hoy nai 
    return newReviewReply;
    // return 
  }




  // 9 done partially
  checkForStockAndsendStockLessNotification(){
    /*
    const stockLessProducts = this.products.filter(product => product.availableQuantity <= product.lowestValueToStock);
    if(stockLessProducts.length > 0){
      // create a notification
      const newNotification = {
        notificationId : Date.now(),
        notificationDetails : `Stock Less Product Found : `+ stockLessProducts.toString(), // 🔰 product er id gula return korte hobe .. 
      }

      // push notification to notification array
      this.notifications.push(newNotification);
      
      return newNotification;
    }
*/
    return `No Stock Less Product Found`;
  }

  // 9 🟢🟢
  async checkForLowQuantity(){
    // custom query
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.availableQuantity <= product.lowestQuantityToStock')
      .getMany();
    
    
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      availableQuantity: product.availableQuantity,
      lowestValueToStock: product.lowestQuantityToStock,
    }))
    // error handling korte hobe .. 
  }



  // 10  🟢🟢
  async getAllNegetiveReview(){
    // amar product id gula dorkar 
    /**
     * seller er under e joto gula product er negative review ase
     * shegular product name, id and negetive review gula show korbe  
     */
  const products = await this.productsRepository
    .createQueryBuilder('product')
    .select(['product.id', 'product.name'])
    .leftJoin('product.reviews', 'review')
    .where('review.reviewCategory = :category', { category: ReviewCategoryEnum.NegetiveReview })
    .addSelect(['review.reviewDetails'])
    .getMany();

  return products;
  
  }

  // 11 done partially
  getOrderStatusPending(){
    /*
    const orderStatusPending = this.Order.filter(preOrder => preOrder.orderStatus === OrderStatusEnum.OrderPending);
    if(orderStatusPending.length > 0){
      return orderStatusPending;
    }
    */
    return `No Order Status Pending Found`;
  }

  //12 done partially
  getPaymentCompleteStatusOfPreOrder(){
    /*
    const paymentComplete = this.Order.filter(preOrder => preOrder.orderStatus === PaymentStatusEnum.PaymentComplete);
    if(paymentComplete.length > 0){
      // 🔰 jader payment complete tader details chole ashbe .. 
      return paymentComplete; 
    }
    */
    return `No Payment Complete Status Found`;
  }

  // 
  // postImage(file){
  //   console.log(file);
  // }

  
  

  // send email 
  async sendEmail(to, emailSubject, emailBody){
    try{
      await this.mailerService.sendMail({
        to: to,
        subject: emailSubject,
        text: emailBody
        });
    }
    catch(err){
      console.log(err);
    }
    
  }
}
