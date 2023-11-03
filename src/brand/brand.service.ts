import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
  ) {}


  allBrand(createBrandDto: CreateBrandDto) {
    const brand = this.brandRepository.find();
    return brand;
  }

}
