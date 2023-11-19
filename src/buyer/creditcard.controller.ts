import { Body, Controller, Post, Session, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreditCardService } from "./creditcard.service";
import { CreditCartDTO } from "./dto/credit-card.dto";

@Controller('creditcard')
export class CreditCardController {
    constructor(private readonly creditCardService: CreditCardService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async creditCard(@Body() creditCartDTO: CreditCartDTO, @Session() session) {
        const buyerEmail = session.buyer;
        const creditCardEntity = await this.creditCardService.addCreditCard(creditCartDTO, buyerEmail);
        return creditCardEntity;
    }
}