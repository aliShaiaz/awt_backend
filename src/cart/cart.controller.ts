import { Controller, Post, Param, Session, Res, Get, Req, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response, Request } from 'express'; // Import Request from express

// Import the 'cookie' module
import * as cookie from 'cookie';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //-----------------------------------------------------------------------

  @Post(':productId')
  async createCart(
    @Session() session: Record<string, any>,
    @Param('productId') productId: number,
    @Res() res: Response
  ) {
    const buyerInfo = session.buyer;

    if (!buyerInfo) {
      return res.status(400).json({ message: 'Buyer information not found in the session' });
    }

    const cart = await this.cartService.createCart(buyerInfo, productId);

    // Set the cookie in the response
    res.cookie('cartId', cart.cartId.toString(), { httpOnly: true, signed: true });

    // Send the cart data as a response
    return res.json(cart);
  }

  //-----------------------------------------------------------------------

  @Get('allcarts')
  findAll() {
    return this.cartService.showAllCart();
  }


  //-----------------------------------------------------------------------

  @Delete(':productId')
  deleteCart(@Param('productId') productId: number) {
    return this.cartService.deleteCart(productId);
  }
}
