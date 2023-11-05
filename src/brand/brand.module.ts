import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { Brand } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Manager])],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
