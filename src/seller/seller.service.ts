import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepository:Repository<Seller>,
    ){}

    findAll() {
      return this.sellerRepository.find();
    }

  remove(id: number) {
     return this.sellerRepository.delete(id);
  }
}
