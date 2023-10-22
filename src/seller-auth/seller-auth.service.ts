import { Injectable } from '@nestjs/common';
import { SellerService } from 'src/seller/seller.service';

@Injectable()
export class SellerAuthService {
  // Our AuthService has the job of retrieving a user and verifying the
  // password. We create a validateUser() method for this purpose. In the 
  // code below, we use a convenient ES6 spread operator to strip the
  // password property from the user object before returning it. 
  // We'll be calling into the validateUser() method from our Passport local
  // strategy in a moment.

  constructor(
    private sellerService: SellerService,
  ){}

  async validateSeller(sellerEmailAddress: string, sellerPassword: string): Promise<any> {
    const user = await this.sellerService.findOneByEmail(sellerEmailAddress);

    if (user && user.sellerPassword === sellerPassword) {
      const { sellerPassword, ...result } = user;
      return result;
    }
    return null;
  }
}
