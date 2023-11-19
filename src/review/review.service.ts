import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Buyer } from '../buyer/entities/buyer.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Buyer) private readonly buyerRepository: Repository<Buyer>,
    @InjectRepository(Review) private readonly productRepository: Repository<Review>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createReviewDto: CreateReviewDto, buyerEmail: string, images: string[], productId: string) {
    const buyer = await this.buyerRepository.findOne({ where: { buyerEmail: buyerEmail } });

    const product = await this.orderRepository.findOne({
      where: {
        products:  productId ,  // Assuming 'id' is the primary key of the Product entity
        buyer: { id: buyer.id },      // Assuming 'id' is the primary key of the Buyer entity
      },
    });

    if(!product){
      throw new Error('This product is not in your order list');
    }
    try {
      

      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxFileSize = 1024 * 1024; // 1 MB

      for (const imagePath of images) {
        // Validate image file types and sizes
        const imageBuffer = Buffer.from(imagePath, 'base64');

        // Convert buffer to Uint8Array to access 'mimetype' property
        const uint8Array = new Uint8Array(imageBuffer);
        const mimeType = this.getMimeType(uint8Array);

        if (!allowedFileTypes.includes(mimeType)) {
          throw new Error(`Unsupported file type`);
        }

        if (imageBuffer.length > maxFileSize) {
          throw new Error(`File size exceeds the limit`);
        }
      }

      const review = await this.reviewRepository.save({
        ...createReviewDto,
        buyer,
        images,
      });

      return review;
    } catch (error) {
      console.error(`Error creating review: ${error.message}`);
      throw new Error('Failed to create review. Please try again later.');
    }
  }

  private getMimeType(buffer: Uint8Array): string {
    // Implement logic to determine mime type from the buffer
    // This might involve using a library or custom logic depending on your requirements
    // For simplicity, assuming all images are either jpeg or png
    return buffer[0] === 0x89 ? 'image/png' : buffer[0] === 0xff ? 'image/jpeg' : 'image/jpg';
  }



  findAll(id: string) {
    return this.reviewRepository.find({ where: { product: id } });
  }

}
