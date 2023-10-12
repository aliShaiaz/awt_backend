export class preOrder{
  productId : number;
  productName :string; // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
  productQuantity : number;
  sellerId : number;
  sellerName : string; // ei field ta dorkar nai .. relationship create kore .. data niye ashte hobe
  specification : [
    {
    title: string;
    description : string;
    },
  ];
  price : number;
  advancePaidMoney : number;
  dueAmount : number;
  estimatedDeliveryDate ?: Date;
  orderStatus: string; //🔰 etar value ENUM theke ashbe .. 
  
}