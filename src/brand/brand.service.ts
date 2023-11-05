import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepository:Repository<Brand>,
    @InjectRepository(Manager) private readonly managerRepository:Repository<Manager>,
    ){}
  async create(createBrandDto: CreateBrandDto, currentManager) {
    const manager = await this.managerRepository.findOne({ where: { email: currentManager } });
    
    if (!manager) {
      // Handle the case where no manager with the given email is found
      // You can throw an error or handle it according to your requirements.
      throw new Error('Manager not found');
    }

    const brand = await this.brandRepository.create(createBrandDto);
    brand.addedBy = manager;
    return this.brandRepository.save(brand);
  }

  findAll() {
    return this.brandRepository.find();
  }

  findOne(id: number) {
    return this.brandRepository.findOne({where: {id: id}});
  }

  async updateBrand(id: number, fields: Partial<UpdateBrandDto>) {
    // Find the brand by its ID
    const brand = await this.brandRepository.findOne({ where: { id: id } });
  
    if (!brand) {
      throw new Error('brand not found');
    }
  
    // Update the brand with the provided fields
    Object.assign(brand, fields);
  
    // Save the updated brand
    return await this.brandRepository.save(brand);
  }

  remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
