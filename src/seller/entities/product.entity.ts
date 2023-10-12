import { ReviewCategoryEnum } from "../model/review.model";

export class Product {
  id: number;
  name: string;
  details ?: string;
  productImage ?: Buffer; // string // this should be an array 
  rating: number;
  price : number; // may be price can be an array 
  availableQuantity : number; /// stockStatus nam e ki arekta field rakhar dorkar ase ?
  lowestValueToStock : number; // 🔰 available quantity , lowestValueToStock er shoman hoile seller er kas e notification jabe .. 
  availableQuality : string[]; // this should be an array 
  /*
  //🟢 category should be another table / entity .. product and category should have .... relationship 
    category -> id , name 
  */
  specification: 
    // should i write like .. details : {}
    {
    title: string;
    description : string;
    }[]
    //🔴 cant assign multiple object 
  ;
  review : 
    {
      // age string deowa chilo ⭕⭕
      reviewCategory : ReviewCategoryEnum; //🔰 etar value ENUM theke ashbe ..
      reviewId : number;
      reviewDetails : string;
    }[]
  

  
}