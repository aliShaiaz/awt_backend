import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSortingDto } from './create-product-sorting.dto';

export class UpdateProductSortingDto extends PartialType(CreateProductSortingDto) {}
