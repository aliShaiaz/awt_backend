import { Body, Injectable, Post } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller/create-seller.dto';
import { UpdateSellerDto } from './dto/seller/update-seller.dto';
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product/product.entity';
import { ReviewCategoryEnum } from './model/review.model';
import { Order } from './entities/order.entity';
import { OrderStatusEnum, PaymentStatusEnum } from './model/preOrder.model';
import { Notification } from './entities/notification.entity';

@Injectable()
export class SellerService {

  
  private sellers: Seller[] = [
    {
      id : 1,
      sellerName : 'b',
      sellerEmailAddress : 'b@gmail.com',
      sellerPassword:'sellerPassword1',
      sellerPhoneNumber: 234, // i think eita string hobe .. 
      sellerDescription:'sellerDescription1',
      // seller email should be here .. 
      //sellerImage ?: Buffer;
      shopName : 'shopName1',
      shopDescription : 'shopDescription1',
      //shopLogo ?: Buffer; 
      status : 'status1', //🔰 etar value ENUM theke ashbe .. 
      rating : 2,
      offlineShopAddress : 'offlineShopAddress1',
      googleMapLocation : 'googleMapLocation1',
    },
    {
      id : 2,
      sellerName : 'd',
      sellerEmailAddress : 'd@gmail.com',
      sellerPassword:'sellerPassword1',
      sellerPhoneNumber: 234, // i think eita string hobe .. 
      sellerDescription:'sellerDescription1',
      // seller email should be here .. 
      //sellerImage ?: Buffer;
      shopName : 'shopName1',
      shopDescription : 'shopDescription1',
      //shopLogo ?: Buffer; 
      status : 'status1', //🔰 etar value ENUM theke ashbe .. 
      rating : 2,
      offlineShopAddress : 'offlineShopAddress1',
      googleMapLocation : 'googleMapLocation1',
    },
    {
      id : 3,
      sellerName : 'c',
      sellerEmailAddress : 'c@gmail.com',
      sellerPassword:'sellerPassword1',
      sellerPhoneNumber: 234, // i think eita string hobe .. 
      sellerDescription:'sellerDescription1',
      // seller email should be here .. 
      //sellerImage ?: Buffer;
      shopName : 'shopName1',
      shopDescription : 'shopDescription1',
      //shopLogo ?: Buffer; 
      status : 'status1', //🔰 etar value ENUM theke ashbe .. 
      rating : 2,
      offlineShopAddress : 'offlineShopAddress1',
      googleMapLocation : 'googleMapLocation1',
    },
    {
      id : 4,
      sellerName : 'e',
      sellerEmailAddress : 'e@gmail.com',
      sellerPassword:'sellerPassword1',
      sellerPhoneNumber: 234, // i think eita string hobe .. 
      sellerDescription:'sellerDescription1',
      // seller email should be here .. 
      //sellerImage ?: Buffer;
      shopName : 'shopName1',
      shopDescription : 'shopDescription1',
      //shopLogo ?: Buffer; 
      status : 'status1', //🔰 etar value ENUM theke ashbe .. 
      rating : 2,
      offlineShopAddress : 'offlineShopAddress1',
      googleMapLocation : 'googleMapLocation1',
    },
  ];

  /*
  private products: Product[] = [
    {
      id: 1,
      name: 'Vivo Y9',
      details : 'details1',
      productImage: 'test image string', // this should be an array 
      rating: 2,
      price : 23, 
      availableQuantity : 33, 
      lowestValueToStock : 3, // 🔰 available quantity , lowestValueToStock er shoman hoile seller er kas e notification jabe .. 
      //availableQuality : ['Local', 'Japanise'], // this should be an array 
      
      availableQuality : [{
        id:1,
        quality:'Local',
        
      }],
      
      
      specification : [
        {
        title: 'Operating System',
        description : 'Android 10',
        },
        {
          title: 'Display',
          description : 'Amoled',
        },
        
      ],
      review : [
        {
          reviewCategory : ReviewCategoryEnum.PositiveReview, //🔰 etar value ENUM theke ashbe ..
          reviewId : 1,
          reviewDetails : "Product is good",
        },
        {
          reviewCategory : ReviewCategoryEnum.NegetiveReview, //🔰 etar value ENUM theke ashbe ..
          reviewId : 2,
          reviewDetails : "Product is bad",
        },
        
      ],
    },
    
  ];
  */

  /*
      //🟢 category should be another table / entity .. product and category should have .... relationship 
        category -> id , name 
      */

  private Order: Order[] = [
    {
      orderId : 1,
      productId : 1,
      productName :'Vivo Y9', // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
      productQuantity : 1,
      sellerId : 1,
      sellerName : 'sellerName1', // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
      specification : [
        {
        title: 'Operating System',
        description : 'Android 10',
        },
        //🔴 cant assign multiple object 
      ],
      price : 23,
      advancePaidMoney : 10,
      dueAmount : 13,
      //estimatedDeliveryDate :,
      orderStatus: OrderStatusEnum.OrderPending, //🔰 etar value ENUM theke ashbe .. 
      orderType : 'General' // ENUM theke ashbe 🔰 ENUM create korte hobe 
    },
  ];

  private notifications: Notification[] = [
    {
      notificationId : 1,
      notificationDetails : 'notification1',
    },
  ];

  // 1 done 
  create(createSellerDto: CreateSellerDto) : Seller {
    let newSeller;
    if(createSellerDto.id){
      newSeller = {...createSellerDto}
    }else{
      newSeller = {id: Date.now(), ...createSellerDto}
    }
    this.sellers.push(newSeller)
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
    this.sellers.push(newSeller)
    return newSeller;
  }

  

  // 2 done 
  findAll() {
    return this.sellers;
  }

  // 3 done 
  findOne(id: number) {
    return this.sellers.find(seller => seller.id == id);
    
  }

  // 4 done 
  update(id: number, updateSellerDto: UpdateSellerDto) : (object | string) {
    let seller = this.sellers.find(seller => seller.id === id);
    if (seller){

      // better hoito ekta object banaye .. sheta return kora .. 
      

      if(updateSellerDto.id){
        seller.id = updateSellerDto.id;
      }
      if(updateSellerDto.name){
        seller.sellerName = updateSellerDto.name;
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
      return seller;
    }
    
    return `Cant find that User`;
  }

  // 5 done 
  remove(id: number) {

    // this method is used for delete array element
    const newArray =  this.sellers.filter(seller => seller.id !== id); // this actually returns new array 
    this.sellers = newArray;
    return this.sellers;
    
  }

  // 6 done fully
  sellerLogin(loginSellerDto){
    
    const seller = this.sellers.find(seller => seller.sellerEmailAddress == loginSellerDto.sellerEmailAddress && seller.sellerPassword == loginSellerDto.sellerPassword);
   
    if(seller){
      const {id} = seller; // id destructure korlam 

      // id destructure kore id return korte pari .. 
      return id;
    }
    
    return `Cant find that User`;
  }

  //8 done fully
  createNewProduct(createProductDto){
    let newProduct;
    if(createProductDto.id){
      newProduct = {...createProductDto}
    }else{
      newProduct = {id: Date.now(), ...createProductDto}
    }
    // 🛡️🛡️🛡️this.products.push(newProduct)
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
    const orderStatusPending = this.Order.filter(preOrder => preOrder.orderStatus === OrderStatusEnum.OrderPending);
    if(orderStatusPending.length > 0){
      return orderStatusPending;
    }
    return `No Order Status Pending Found`;
  }

  //12 done partially
  getPaymentCompleteStatusOfPreOrder(){
    const paymentComplete = this.Order.filter(preOrder => preOrder.orderStatus === PaymentStatusEnum.PaymentComplete);
    if(paymentComplete.length > 0){
      // 🔰 jader payment complete tader details chole ashbe .. 
      return paymentComplete;
    }
    return `No Payment Complete Status Found`;
  }

  // 
  postImage(file){
    console.log(file);
  }
}
