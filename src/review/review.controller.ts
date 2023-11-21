import { Controller, Get, Param, Session, HttpException, HttpStatus, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}


  @Get('all')
  @UseGuards(AuthGuard('session'))
  findAll(@Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.reviewService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('session'))
  findOne(@Param('id') id: string, @Session() session) {
    if(session.manager == null) throw new HttpException('Unauthorized Access', HttpStatus.BAD_REQUEST);
    return this.reviewService.findOne(+id);
  }

}
