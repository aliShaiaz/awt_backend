import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository:Repository<Category>,
    @InjectRepository(Manager) private readonly managerRepository:Repository<Manager>,
    ){}

    async create(createCategoryDto: CreateCategoryDto, currentManager) {
      const manager = await this.managerRepository.findOne({ where: { email: currentManager } });
    
      if (!manager) {
        // Handle the case where no manager with the given email is found
        // You can throw an error or handle it according to your requirements.
        throw new Error('Manager not found');
      }
    
      const category = await this.categoryRepository.create(createCategoryDto);
      category.addedBy = manager;
      return this.categoryRepository.save(category);
    }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({where: {id: id}});
  }

  async updateCategory(id: number, fields: Partial<UpdateCategoryDto>) {
    // Find the category by its ID
    const category = await this.categoryRepository.findOne({ where: { id: id } });
  
    if (!category) {
      throw new Error('Category not found');
    }
  
    // Update the category with the provided fields
    Object.assign(category, fields);
  
    // Save the updated category
    return await this.categoryRepository.save(category);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
