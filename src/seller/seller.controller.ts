import { Controller, Param, Delete, UseGuards, Session, HttpException, HttpStatus, Get } from '@nestjs/common';
import { SellerService } from './seller.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get('all')
  @UseGuards(AuthGuard('session'))
  findAll(@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.sellerService.findAll();
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard('session'))
  remove(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.sellerService.remove(+id);
  }
}
