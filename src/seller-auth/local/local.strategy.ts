import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SellerAuthService } from "../seller-auth.service";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sellerAuthService: SellerAuthService) {
    super({ usernameField: 'sellerEmailAddress',
    passwordField: 'sellerPassword', 
   });
  }

  // for each strategy, Passport will call the validate() method
  async validate(sellerEmailAddress: string, sellerPassword: string): Promise<any> {
    
    //const seller = await this.sellerAuthService.validateSeller(sellerEmailAddress, sellerPassword);
    let seller ;
    try{
      seller = await this.sellerAuthService.validateSeller(sellerEmailAddress, sellerPassword);
      // console.log(seller);
    }catch(err){
      
      throw new HttpException(
      {
        status : HttpStatus.UNAUTHORIZED, // statusCode - 401
        error : "Custom Error Message from local-stategy.ts : Credential is wrong", // short description
      }, 
      HttpStatus.UNAUTHORIZED // 2nd argument which is status 
      ,
      {
        //optional //provide an error cause. 
        cause : err
      }
      );
    }
    if (!seller) {
      //throw new UnauthorizedException();
      throw new HttpException(
        {
          status : HttpStatus.UNAUTHORIZED, // statusCode - 401
          error : "Custom Error Message from local-stategy.ts : Credential is wrong", // short description
        }, 
        HttpStatus.UNAUTHORIZED // 2nd argument which is status 
        ,
        // {
        //   //optional //provide an error cause. 
        //   // cause : err
        // }
        );
      
    }
    return seller;
  }
}