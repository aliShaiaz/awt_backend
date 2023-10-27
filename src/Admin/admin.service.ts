import { Injectable } from "@nestjs/common";
import { AdminEntity } from "./entitys/admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class AdminService {
    private adminRepo: Repository<AdminEntity>;
    constructor(
        @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>,
    )
    {
        this.adminRepo = adminRepository;
    }


    getAdmin(): string {
        return 'Hello Admin. This is main project';
      }

      async findUserById(id: string): Promise<AdminEntity | null> {
        return this.adminRepository.findOne({ where: { id } });
    }
    


      async createAccount(data: any): Promise<AdminEntity>{
        return this.adminRepo.save(data);
      }
}