import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductSortingService {
  

  findAll() {
    return `This action returns all productSorting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSorting`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} productSorting`;
  }
}
