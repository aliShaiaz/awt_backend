import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/seller/entities/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSortingService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
   ){}
  async sortByMinPriceRange(min: number) {
    // find those product whose price is minium to min number and higher
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.price >= :min', { min })
      .getMany();

    
  }

  async sortAllByMaxPriceRange(max : number) {
    // return `maximum price range `+ max;
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.price <= :max', { max })
      .getMany();
  }

  async sortAllByMinAndMaxPriceRange(min, max) {
    

    if(min && max){
      return await this.productRepository
      .createQueryBuilder('product')
      .where('product.price >= :min', { min })
      .andWhere('product.price <= :max', { max })
      .getMany();
    }

    
  }

  sortProductByBrand() {
    return `This action returns all productSorting`;
  }

  sortProductByCategory() {
    return `This action returns all productSorting`;
  }
}
