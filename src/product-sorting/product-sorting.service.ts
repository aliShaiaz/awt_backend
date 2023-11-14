import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import { Brand } from 'src/seller/entities/product/brand.entity';
import { Category } from 'src/seller/entities/product/category.entity';
import { Product } from 'src/seller/entities/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSortingService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
   ){}
  async sortByMinPriceRange(min: number) {
    // find those product whose price is minium to min number and higher

    // return await this.productRepository
    //   .createQueryBuilder('product')
    //   .where('product.price >= :min', { min })
    //   .getMany();

    const sortedProduct = this.productRepository
    .createQueryBuilder('product')
    .where('product.price >= :min', { min })
    .getMany();

    if((await sortedProduct).length > 0 )
    {
      return sortedProduct;
    }else{
      throw new HttpException(
        {
          status : HttpStatus.NOT_FOUND, // statusCode - 401
          error : "product not found in this minimum price range.", // short description
        }, 
        HttpStatus.NOT_FOUND // 2nd argument which is status 
        
        );
    }
  }

  async sortAllByMaxPriceRange(max : number) {
    // return `maximum price range `+ max;

    const sortedProduct =  await this.productRepository
      .createQueryBuilder('product')
      .where('product.price <= :max', { max })
      .getMany();

      if((await sortedProduct).length > 0 )
      {
        return sortedProduct;
      }else{
        throw new HttpException(
          {
            status : HttpStatus.NOT_FOUND, // statusCode - 401
            error : "product not found in this maximum price range.", // short description
          }, 
          HttpStatus.NOT_FOUND // 2nd argument which is status 
          
          );
      }
  }

  async sortAllByMinAndMaxPriceRange(min, max) {
    

    if(min && max){
      const sortedProduct =  await this.productRepository
      .createQueryBuilder('product')
      .where('product.price >= :min', { min })
      .andWhere('product.price <= :max', { max })
      .getMany();

      if((await sortedProduct).length > 0 )
    {
      return sortedProduct;
    }else{
      throw new HttpException(
        {
          status : HttpStatus.NOT_FOUND, // statusCode - 401
          error : "product not found in maximum and minimum price range.", // short description
        }, 
        HttpStatus.NOT_FOUND // 2nd argument which is status 
        
        );
    }
    }

    
  }

  async sortProductByBrand(brand: string) {
    
    var brandLocal : any = brand;
    // if brand is string then 
    ///////// search in brand table and find brand id against that brand name 
    console.log("1----")
    if( typeof  brand == 'string' &&  typeof  brand != 'number' ){
      console.log("2----")
      const branddddd =  await this.brandsRepository.findOne({ where: { Name: brand } });
      if(typeof branddddd == 'object' && branddddd != undefined ){
        console.log("3----")
        brandLocal = branddddd.BrandID;
      }
      // console.log(BrandID)
      if(branddddd == undefined){
        console.log("4----")
        brandLocal = brand;
      }
      
    }

    if(brandLocal){
      console.log("5----")
      return this.productRepository
      .createQueryBuilder('product')
      .where('product.Brand = :brandLocal', { brandLocal })
      .getMany();

    }
    
  }

  sortProductByCategory(Category : String) {
    if(Category){
      return this.productRepository
      .createQueryBuilder('product')
      .where('product.Category = :Category', { Category })
      .getMany();

    }
  }
}
