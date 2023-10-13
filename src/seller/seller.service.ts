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

// Status📃(total: problem : )
@Injectable()
export class SellerService {

  constructor(
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>
  
  ){}

  /*
      //🟢 category should be another table / entity .. product and category should have .... relationship 
        category -> id , name 
      */

  
  private notifications: Notification[] = [
    {
      notificationId : 1,
      notificationDetails : 'notification1',
    },
  ];

  // 1 done // 🟢🔴
  async create(createSellerDto: CreateSellerDto) : Promise<Seller> {
    console.log("WE ARE IN SERVICE ----------", createSellerDto)
    let newSeller;
    if(createSellerDto.id){
      console.log("WE ARE IN IF ----------")
      newSeller = {...createSellerDto}
    }else{
      console.log("WE ARE IN ELSE ----------")
      newSeller = {id: Date.now(), ...createSellerDto}
      //newSeller = {...createSellerDto}
    }
    this.sellersRepository.create(newSeller);
    await this.sellersRepository.save(newSeller);
    return newSeller;
  }


  // 🔴🔴🔴 need to test
  createWithImage(createSellerDto: CreateSellerDto, file) : Seller {
    let newSeller;
    if(createSellerDto.id){
      newSeller = {...createSellerDto, sellerImage: file}
    }else{
      newSeller = {id: Date.now(), ...createSellerDto, sellerImage: file}
    }
    //🛡️🛡️🛡️this.sellers.push(newSeller)
    return newSeller;
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
        seller.id = seller.id; // eta update kora jabe na .. 
        // html input form er type rakhte hobe hidden 
      }
      if(updateSellerDto.sellerName){
        seller.sellerName = updateSellerDto.sellerName;
      }
      if(updateSellerDto.description){
        seller.sellerDescription = updateSellerDto.description;
      }
      if(updateSellerDto.shopName){
        seller.shopName = updateSellerDto.shopName;
      }
      if(updateSellerDto.status){
        seller.status = updateSellerDto.status;
      }
      //return seller;
      await this.sellersRepository.update(id, seller);
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
  sellerLogin(loginSellerDto){ 
    
    // const seller = this.sellers.find(seller => seller.sellerEmailAddress == loginSellerDto.sellerEmailAddress && seller.sellerPassword == loginSellerDto.sellerPassword);
   
    // if(seller){
    //   const {id} = seller; // id destructure korlam 

    //   // id destructure kore id return korte pari .. 
    //   return 2;
    // }
    
    return `Cant find that User`;
  }

  //8 done fully
  async createNewProduct(createProductDto) : Promise<Product>{
    let newProduct;
    console.log("------------------- from service -------------------");
    
    if(createProductDto.id){
      console.log("------------------- from IF -------------------");
    
      newProduct = {...createProductDto}
    }else{
      console.log("------------------- from Else -------------------");
    
      newProduct = {id: Date.now(), ...createProductDto}
    }
    // 🛡️🛡️🛡️this.products.push(newProduct)
    console.log(newProduct);
    await this.productsRepository.create(newProduct);
    await this.productsRepository.save(newProduct);
    
    return newProduct;
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

  // 10 done partially 
  getNegetiveReview(){
    // amar product id gula dorkar 
    /*
    const negetiveReview = this.products.filter(product => product.review[0].reviewCategory === ReviewCategoryEnum.NegetiveReview);
    if(negetiveReview.length > 0){
      // 🔰 jeta korte hobe .. jei product gular negetive review ase .. shei product gular id, name and review gula niye object baniye return korte hobe .. 
      return negetiveReview;
    }
    */
    return `No Negetive Review Found`;

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
  postImage(file){
    console.log(file);
  }
}
