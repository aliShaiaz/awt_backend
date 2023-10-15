import { Injectable } from '@nestjs/common';
import {  CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { Buyer } from './entities/buyer.entity';

@Injectable()
export class BuyerService {

  private Buyer: Buyer[] = []; // Use lowercase for variable names by convention

create(createBuyerDto: CreateBuyerDto): Buyer {
  let newBuyer;

  function generateId() {
    const currentDate = new Date();
    const fourDigitId = currentDate.getMilliseconds().toString().substr(0, 4);
    const intId = parseInt(fourDigitId);
    return intId;
  }

  if (createBuyerDto.BuyerPassword) {
    // Check if the ID already exists in the buyers array
    const idExists = this.Buyer.some((Buyer) => Buyer.id === createBuyerDto.id);

    if (!idExists) {
      if (createBuyerDto.id) {
        newBuyer = { ...createBuyerDto };
      } else {
        newBuyer = { id: generateId(), ...createBuyerDto };
      }
    } else {
      newBuyer = { msg: "This ID already exists" };
    }
  } else {
    newBuyer = {
      msg: "Password must be provided",
    };
  }

  this.Buyer.push(newBuyer);
  return newBuyer;
}


  findAll() {
    return this.Buyer;
  }

  findOne(id: number) {
    return this.Buyer.find(Buyer => Buyer.id = id);
  }

  update(id: number, updateBuyerDto: UpdateBuyerDto) {
    let buyer = this.Buyer.find(Buyer => Buyer.id === id)
    if(buyer){
      if(updateBuyerDto.id){
        buyer.id = updateBuyerDto.id;
      }
      if(updateBuyerDto.BuyerName){
        buyer.BuyerName = updateBuyerDto.BuyerName;
      }
      if(updateBuyerDto.BuyerEmail){
        buyer.BuyerEmail = updateBuyerDto.BuyerEmail;
      }
      if(updateBuyerDto.BuyerNumber){
        buyer.BuyerNumber = updateBuyerDto.BuyerNumber;
      }
      if(updateBuyerDto.BuyerAddress){
        buyer.BuyerAddress = updateBuyerDto.BuyerAddress;
      }
    }else{
      return "Buyer not found?";
    }
  }

  remove(id: number) {
    const newbuyer = this.Buyer.filter(Buyer => Buyer.id != id);
    this.Buyer = newbuyer;
    return this.Buyer;
  }


}
