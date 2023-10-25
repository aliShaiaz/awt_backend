import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SellerAuthService } from "../seller-auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sellerAuthService: SellerAuthService) {
    super({ usernameField: 'sellerEmailAddress',
    passwordField: 'sellerPassword', 
   });
  }

  // for each strategy, Passport will call the validate() method
  async validate(sellerEmailAddress: string, sellerPassword: string): Promise<any> {
    const seller = await this.sellerAuthService.validateSeller(sellerEmailAddress, sellerPassword);
    if (!seller) {
      throw new UnauthorizedException();
    }
    return seller;
  }
}