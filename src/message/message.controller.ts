import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
//import { MessageService } from './mess.age.s.ervice.nonRelationl';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { SessionGuard } from 'src/seller-auth/session/session.guard';

@Controller('seller/message') //🔰  but we want this like seller/message .. 
// how can we do that 
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // 🔰 regular expression use kore .. seller jodi kono buyer er name / email likhe dey .. 
  // taile oi buyer er name and picture show korbo .. 
  // eta only seller er product jara wishlist e rakhse .. shei buyer der name/ email 
  // er moddhei search korbe .. 


  // I think done 🟢 ✔️ initial Test Done
  @Post(/*'createNewMessage'*/ 'createNewMessage')
  async createNewMessage(
    @Body() createMessageDto /*: CreateMessageDto*/ ,
    //@Query('senderEmail') senderEmail: string, //😢 sender email ki evabe send kora thik hobe ? 
  ) : Promise<Message> {
    //message 
    //receiverEmail
    //senderEmail
   
    return await this.messageService.createNewMessage(createMessageDto);
  }

  // I think done 🟢
  @Post('createNewConversation')
  createNewConversation(@Body() createConversationDto/*: CreateConversationDto*/) {
    //participantsEmail
    //timeStamps?
    return this.messageService.createNewConversation(createConversationDto);
  }
  //🔰 createNewConversation e to sender-receiver evabe deowa lage as participantsEmail
  // but amra chaile sender ar receiver alada vabe send kore arekta conversation create korar api create korte pari
  
  
  // I think done 🟢✔️ initial Test Done
  // showAllConversationToCurrentLoggedInUser
  // 🔰🔰
  @UseGuards(SessionGuard)// 🔰🔰🔰🔰🔰🔰
  // 🔰🔰
  @Get('showAllConversation')
  showAllConversationToCurrentLoggedInUser(
    @Query('loggedInUserEmail') currentLoggedInUserEmail: string
  ) {
    return this.messageService.showAllConversationToCurrentLoggedInUser(currentLoggedInUserEmail);
  }

  @Get('showAllMessageOfAConversation/:conversationId')
  showAllMessageOfAConversation(
    @Param('conversationId') conversationId: number
  ){
    return this.messageService.showAllMessageOfAConversation(conversationId);
  }
  
  // 🔰delete a conversation
  // 🔰delete a message 


  
}
