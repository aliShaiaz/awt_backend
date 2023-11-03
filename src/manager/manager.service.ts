import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';
import { ManagerSignUpDto } from './dto/manager-signup.dto';
import { ManagerSignInDto } from './dto/manager-signin.dto';
import { hash, compare } from 'bcrypt';


@Injectable()
export class ManagerService {

  constructor(
    @InjectRepository(Manager)
    private managersRepository: Repository<Manager>,
  ) {}

///////////////////////////////////////////
async signup(managerSignUpDto: ManagerSignUpDto):Promise<Manager>{

  const managerInfo = await this.managersRepository.findOne({where:{email: managerSignUpDto.email}});

  if(managerInfo) throw new BadRequestException('Email is not available');  //Exception handling
  managerSignUpDto.password= await hash(managerSignUpDto.password,10)
  let manager=this.managersRepository.create(managerSignUpDto);
  manager= await this.managersRepository.save(manager);
  delete manager.password
  return manager;
}


async signin(managerSignInDto: ManagerSignInDto) {
  const managerExists = await this.managersRepository
    .createQueryBuilder('manager')
    .addSelect('manager.password')
    .where('manager.email = :email', { email: managerSignInDto.email })
    .getOne();

  if (!managerExists) {
    throw new BadRequestException('Bad credentials');
  }

  const matchPassword = await compare(managerSignInDto.password, managerExists.password);

  if (!matchPassword) {
    throw new BadRequestException('Bad credentials');
  }

  delete managerExists.password;

  return managerExists;
}


//-----------------------------------------------------------------

  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  async findAll() {
    return await this.managersRepository.find();
  }

  async findOne(id: number):Promise<Manager> {
    const manager= await this.managersRepository.findOneBy({id});
    if(!manager) throw new NotFoundException('user not found.');
    return manager; 
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return 'This action updates a #${id} manager';
  }

  async remove(id: number) {
    return this.managersRepository.delete(id);
  }


  async findManagerByEmail(email: string): Promise<Manager | null> {
    return this.managersRepository.findOne({ where: { email: email } });
  }

}


