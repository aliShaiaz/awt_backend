import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from './entities/buyer.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { BuyerLoginDto } from './dto/login-buyer.dto';
import { extname, join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer) private readonly buyerRepository: Repository<Buyer>,
    private readonly mailerService: MailerService, // Add this line
  ) {}


  //------------------------------------------------------------------------


  async signup(createBuyerDto: CreateBuyerDto, imageFile): Promise<Buyer> {
    const buyerImage = imageFile.filename;
    const saltRounds = 10;
    const hashedPassword = await hash(createBuyerDto.BuyerPassword, saltRounds);

    const buyer = new Buyer();
    buyer.buyerFirstName = createBuyerDto.BuyerFirstName;
    buyer.buyerLastName = createBuyerDto.BuyerLastName;
    buyer.buyerEmail = createBuyerDto.BuyerEmail;
    buyer.buyerPhoneNo = createBuyerDto.BuyerPhoneNo;
    buyer.buyerGender = createBuyerDto.BuyerGender;
    buyer.buyerDateOfBirth = createBuyerDto.BuyerDateOfBirth;
    buyer.buyerAddresses = createBuyerDto.BuyerAddresses;
    buyer.buyerPassword = hashedPassword;
    buyer.buyerimage = buyerImage.toString();

    const savedBuyer = await this.buyerRepository.save(buyer);
    delete savedBuyer.buyerPassword;

    this.mailerService.sendMail({
      to: savedBuyer.buyerEmail,
      from: 'your_company_email@example.com',
      subject: 'Welcome to Our E-commerce Platform',
      text: `Hello ${savedBuyer.buyerFirstName} ${savedBuyer.buyerLastName},\n\nThank you for choosing to join our E-commerce platform. We're thrilled to have you as a member of our community.`,
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            p {
              font-size: 16px;
              line-height: 1.5;
              color: #333;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              text-align: center;
              padding: 10px;
            }
            .message {
              padding: 20px;
            }
            .signature {
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our E-commerce Platform</h1>
            </div>
            <div class="message">
              <p>Dear <b>${savedBuyer.buyerFirstName} ${savedBuyer.buyerLastName}</b>,</p>
              <p>Thank you for signing up with our E-commerce platform. Your decision to join us is greatly appreciated.</p>
              <p>We are committed to providing you with a seamless and enjoyable shopping experience. Our extensive product range and dedicated customer support are here to assist you every step of the way.</p>
              <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
              <p>Once again, welcome to our E-commerce platform, and we look forward to serving you.</p>
            </div>
            <div class="signature">
              <p>Best regards,<br>E-commerce Team</p>
            </div>
          </div>
        </body>
      </html>
      `

    });

    return savedBuyer;
  }



  //------------------------------------------------------------------------


  

  async login(buyerLoginDto: BuyerLoginDto) {
    const buyerExists = await this.buyerRepository
      .createQueryBuilder('buyer')
      .addSelect('buyer.buyerPassword')
      .where('buyer.buyerEmail = :buyerEmail', { buyerEmail: buyerLoginDto.BuyerEmail })
      .getOne();

    if (!buyerExists) {
      throw new BadRequestException('Bad credentials');
    }

    const matchPassword = await compare(buyerLoginDto.BuyerPassword, buyerExists.buyerPassword);

    if (!matchPassword) {
      throw new BadRequestException('Bad credentials');
    }

    delete buyerExists.buyerPassword;

    return buyerExists;
  }


  //------------------------------------------------------------------------


  async findOne(id: number): Promise<Buyer | undefined> {
    const buyer = await this.buyerRepository.findOne({where: {id}});

    delete buyer.buyerPassword;

    return buyer;
  }


  //------------------------------------------------------------------------


  async findAll(): Promise<Buyer[]> {
    const buyers = await this.buyerRepository.find();
    
    if(!buyers) throw new NotFoundException('Buyer not found');
    // Remove 'buyerPassword' field from each buyer
    buyers.forEach(buyer => {
      delete buyer.buyerPassword;
    });
  
    return buyers;
  }
  


  //------------------------------------------------------------------------


  async update(id: number, updateBuyerDto: UpdateBuyerDto): Promise<Buyer> {
    const saltRounds = 10;
    const hashedPassword = await hash(updateBuyerDto.BuyerPassword, saltRounds);

    const buyer = new Buyer();
    buyer.id = id; // Include the id for updating
    buyer.buyerFirstName = updateBuyerDto.BuyerFirstName;
    buyer.buyerLastName = updateBuyerDto.BuyerLastName;
    buyer.buyerEmail = updateBuyerDto.BuyerEmail;
    buyer.buyerPhoneNo = updateBuyerDto.BuyerPhoneNo;
    buyer.buyerGender = updateBuyerDto.BuyerGender;
    buyer.buyerDateOfBirth = updateBuyerDto.BuyerDateOfBirth;
    buyer.buyerAddresses = updateBuyerDto.BuyerAddresses;
    buyer.buyerPassword = hashedPassword;

    const savedBuyer = await this.buyerRepository.save(buyer);
    delete savedBuyer.buyerPassword;

    return savedBuyer;
  }


  //------------------------------------------------------------------------


  async remove(id: number) {
    return this.buyerRepository.delete(id);
  }


  //------------------------------------------------------------------------


  async findBuyerByEmail(email: string): Promise<Buyer | null> {
    return this.buyerRepository.findOne({ where: { buyerEmail: email } });
  }

  
}
