import { IsNumber, IsObject, Min } from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity'; // Import the Cart entity here
import { Product } from 'src/product/entities/product.entity'; // Import the Product entity here

export class CreateCartItemDto {
  @IsObject()
  cart: Cart;

  @IsObject()
  product: Product;

  @IsNumber()
  @Min(1)
  quantity: number;
}
