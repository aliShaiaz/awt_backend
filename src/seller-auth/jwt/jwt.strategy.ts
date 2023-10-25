
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'sellerEmailAddress', // not sure 
      passwordField: 'sellerPassword',  // not sure 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "SECRET",
    });
  }

  async validate(payload: any) {
    // payload.sub => seller.id
    // payload.username => seller.username
    // payload.sellerEmailAddress => seller.sellerEmailAddress
    return { sellerId: payload.sub, sellerEmailAddress: payload.sellerEmailAddress };
  }
}
