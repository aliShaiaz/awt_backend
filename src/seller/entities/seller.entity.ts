export class Seller {
  id : number;
  sellerName : string;
  sellerEmailAddress : string;
  sellerPassword:string;
  sellerPhoneNumber:number; // i think eita string hobe .. 
  sellerDescription?:string;
  sellerImage ?: Buffer;
  shopName : string;
  shopDescription ?: string;
  shopLogo ?: Buffer; 
  status ?: string; //🔰 etar value ENUM theke ashbe .. 
  rating ?: number;
  offlineShopAddress ?: string;
  googleMapLocation ?: string;
  //@Column('bytea', { nullable: true }) // Using 'bytea' type for image data
  //string; // Assuming you store image URLs here
}


