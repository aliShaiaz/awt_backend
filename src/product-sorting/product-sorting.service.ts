import { Injectable } from '@nestjs/common';
import { CreateProductSortingDto } from './dto/create-product-sorting.dto';
import { UpdateProductSortingDto } from './dto/update-product-sorting.dto';

@Injectable()
export class ProductSortingService {
  create(createProductSortingDto: CreateProductSortingDto) {
    return 'This action adds a new productSorting';
  }

  findAll() {
    return `This action returns all productSorting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSorting`;
  }

  update(id: number, updateProductSortingDto: UpdateProductSortingDto) {
    return `This action updates a #${id} productSorting`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSorting`;
  }
}
