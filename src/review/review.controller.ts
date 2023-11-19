import { Controller, Post, Body, UseInterceptors, UploadedFiles, Session, BadRequestException, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':productId')
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }

        const maxSize = 1024 * 1024; // 1MB
        if (file.size > maxSize) {
          return callback(new BadRequestException('File size exceeds the limit'), false);
        }

        callback(null, true);
      },
    }),
  )
  async create(
    @Param('productId') productId: string,
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Session() session,
  ) {
    const buyerEmail = session.buyerEmail;

    if (!images || images.length === 0) {
      throw new BadRequestException('At least one image must be provided');
    }

    const imagePaths: string[] = images.map(image => `./reviewImage/${image.filename}`);

    return this.reviewService.create(createReviewDto, buyerEmail, imagePaths, productId);
  }


  @Get(':productId')
  async findAll(@Param('productId') id: string) {
    return this.reviewService.findAll(id);
  }
}
