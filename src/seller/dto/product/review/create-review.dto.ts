export class CreateReviewDto{
  reviewId ?: number;
  reviewCategory : string;
  reviewDetails : string;
  productId : number;
  // replies ?: any[];  // 🔴😥 sure na ..
  /**
   * replies hobe na .. karon review create 
   * korar shomoy replies exist e kore na ..
   * i mean create hoy na  
   * */ 
}