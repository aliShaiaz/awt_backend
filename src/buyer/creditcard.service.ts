import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreditCartEntity } from "./entities/credit-card.entity";
import { CreditCartDTO } from "./dto/credit-card.dto";
import { Buyer } from "./entities/buyer.entity";

@Injectable()
export class CreditCardService {
    constructor(
        @InjectRepository(CreditCartEntity) private readonly creditCardRepository: Repository<CreditCartEntity>,
        @InjectRepository(Buyer) private readonly buyerRepository: Repository<Buyer>,
      ) {}

      async addCreditCard(creditCardDTO: CreditCartDTO, buyerEmail: string): Promise<CreditCartEntity> {
        const buyer = await this.buyerRepository.findOne({ where: { buyerEmail: buyerEmail } });
    
        if (!buyer) {
            throw new NotFoundException('Buyer not found');
        }
    
        if (!creditCardDTO.CardNumber) {
          throw new BadRequestException('CardNumber is required');
        }
    
        // Check if the card number already exists for the buyer
        const cardNo = await this.creditCardRepository.findOne({ where: { buyer: { id: buyer.id } } });
    
        if (cardNo) {
          throw new BadRequestException('This credit card is not available');
        }
    
        const creditCard = new CreditCartEntity();
        creditCard.CardNumber = creditCardDTO.CardNumber;
        creditCard.CardHolderName = creditCardDTO.CardHolderName;
        creditCard.ExpDate = creditCardDTO.ExpDate;
        creditCard.CVV_code = creditCardDTO.CVC_code;
    
        creditCard.buyer = buyer;
    
        return await this.creditCardRepository.save(creditCard);
      }
}
