import { Injectable } from '@nestjs/common';
import { SellerService } from 'src/seller/seller.service';
// for jwt
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/seller/entities/seller.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SellerAuthService {
  
  constructor(
    //private sellerService: SellerService,
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    private jwtService: JwtService
  ){}

  async validateSeller(sellerEmailAddress: string, sellerPassword: string): Promise<any> {
    //const user = await this.sellerService.findOneByEmail(sellerEmailAddress);
    /**
     * 🔴🔴🔴🔴🔴 why seller service can not be used here ? 
     */
    const user = await this.sellersRepository.findOneOrFail({
      where : {sellerEmailAddress: sellerEmailAddress}
    });

    
      const isMatch = await bcrypt.compare(sellerPassword, user.sellerPassword); //  dbpassword = user.sellerPassword
      // console.log(isMatch, "-- seller given Password --", sellerPassword, "--  user.sellerPassword  --", user.sellerPassword);
      // if (user && user.sellerPassword === sellerPassword) {
      if (user && isMatch) {
      const { sellerPassword, ...result } = user;
      return result; // why ? 
    }
    return null;
  }

  async loginWithJWT(seller: any){
    console.log("auth service -> loginWithJWT(seller) => ", seller);
    const payload = { sellerEmailAddress: seller.sellerEmailAddress, sub: seller.id }; // this seller.id is sellers actual id 
    console.log("auth service -> loginWithJWT(seller){payload} => ", payload);
    console.log("auth service -> loginWithJWT(seller){return access_token} => ", this.jwtService.sign(payload));
    
    return {
      access_token: this.jwtService.sign(payload,{secret : "SECRET"}),
    }
  }
}


// Our AuthService has the job of retrieving a user and verifying the
  // password. We create a validateUser() method for this purpose. In the 
  // code below, we use a convenient ES6 spread operator to strip the
  // password property from the user object before returning it. 
  // We'll be calling into the validateUser() method from our Passport local
  // strategy in a moment.
 