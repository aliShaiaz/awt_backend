import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review) private readonly reviewRepository:Repository<Review>,
    ){}

  findAll() {
    return this.reviewRepository.find();
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({where: {id: id}});
  }


}
