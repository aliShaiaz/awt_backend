import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SellerService } from 'src/seller/seller.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/seller/entities/seller.entity';
import { Repository } from 'typeorm';
import { Buyer } from 'src/seller/entities/buyer.entity';

@Injectable()
export class MessageService {
  /**
   * 🤔🙋‍♂️❓seller and buyer ki duita alada table e store korbo ? 
   * naki same table e store korbo .. 
   * 
   * ❓seller service e ekta variable declare kora ase ... sheta amar message service e access 
   * kora lagbe .. ekhon ami ki korbo .. 
   */
  constructor(private sellerService : SellerService, 
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Conversation) private conversationsRepository: Repository<Conversation>,
    @InjectRepository(Seller) private sellersRepository: Repository<Seller>,
    @InjectRepository(Buyer) private buyersRepository: Repository<Buyer>,
    ){}

   

  // I think done 🟢
  async createNewMessage(createMessageDto /*: CreateMessageDto*//*, senderEmail:string*/) : Promise<Message> {
    const {receiverEmail, message, senderEmail} = createMessageDto;
    const newMessage = {
      messageId : Date.now(),
      senderEmail : senderEmail, // html input type hidden 
      receiverEmail : receiverEmail,
      message : message,
      // createdAt: Date,
      // updatedAt: Date
    }
    // check conversation already exist or not 
    console.log(" ============== in service");

    const participant_email1 =  senderEmail+'-'+receiverEmail;
    const participant_email2 =  receiverEmail+'-'+senderEmail;

    //const conversation = this.conversationsRepository.find(conversation => conversation.participantsEmail === participant_email1 || conversation.participantsEmail === participant_email2);
    
    const conversation : any = await this.conversationsRepository.find({
      where: [
        { participantsEmail: participant_email1 }, // 🛡️🛡️🛡️ we need OR logic here .. 
        { participantsEmail: participant_email2 },
      ],
      // select: ["conversationId"]
    });
    
    if(conversation){
      console.log(" ============== conversation found");
      const { conversationId} = conversation;
      // conversation exist 
      // add message in message table 
      const newMessageWithConversationId = {
        ...newMessage,
        conversationId : conversationId
      }
      
      //this.messages.push(newMessageWithConversationId);
      await this.messagesRepository.create(newMessageWithConversationId);

      return newMessageWithConversationId;
    }else{
      console.log(" ============== conversation does not exist");
      // conversation does not exist 
      // create a conversation with participant_email and timeStamps

      //🟢check korte hobe sender and receiver seller and buyer database e ase kina
      const participantsAreInDB = await this.sellersRepository.findOne({ 
        where: [
          {sellerEmailAddress : senderEmail},
          {sellerEmailAddress : receiverEmail}
        ]
      });

      if(participantsAreInDB){
        console.log("sender email or receiver email are in sellerRepository ")
      }else{
        const participantsAreInDB =  await this.buyersRepository.findOne({ 
          where: [
            {BuyerEmail : senderEmail},
            {BuyerEmail : receiverEmail}
          ]
        });

        if(participantsAreInDB){
          console.log("sender email or receiver email are in buyerRepository ")
      
        }
        console.log("Cant found ------------------")
      }

      
      // 🟢 lets call createNewConversation service function to do that 
      const newConversation = {
        participantsEmail : participant_email1,
        timeStamps : Date.now()
      }
      console.log(" ============== newConversation Creation done");
      const newCreatedConversation =  await this.createNewConversation(newConversation);
      const newlyCreatedConversationId = newCreatedConversation.conversationId;

      // jei conversatioin ta create korlam .. shetar id amar jana lagbe 

      // new message with conversation id
      const newMessageWithConversationId = {
        ...newMessage,
        conversationId : newlyCreatedConversationId
      }

      // its time to save this in message table 
      this.messagesRepository.create(newMessageWithConversationId);
      return newMessageWithConversationId;
    }
    //😢 ekhane ki kichu return korar dorkar ase ? 
  }

  // I think done 🟢
  async createNewConversation(createConversationDto/*: CreateConversationDto */) : Promise<Conversation> {
    const {participantsEmail, timeStamps, sellerId, buyerId} = createConversationDto;
    // participantsEmail er throw te .. seller and buyer er id khuje ber korte hobe 
    // then sheta newConversation object er vitor e pass korte hobe 
    const newConversation = {
      conversationId : Date.now(),
      participantsEmail : participantsEmail,
      timeStamps : timeStamps,
      sellerId : sellerId,
      buyerId : buyerId 
    }
    this.conversationsRepository.create(newConversation);
    return newConversation;
    //return 'This action adds a new message';
  }
  
  async showAllConversationToCurrentLoggedInUser(currentLoggedInUserEmail : string) :Promise<Conversation[]> {   
    // current logged in user jodi participant email er moddhe thake .. taile shei conversation show korbo
    const conversations = await this.conversationsRepository.find({
      where: [
        { participantsEmail: currentLoggedInUserEmail }, // 🛡️🛡️🛡️ not sure .. 
      ]
    });


    const participantsEmail = conversations.map(conversation => conversation.participantsEmail);

    // ekhon participantsEmail er moddhe theke currentLoggedInUserEmail remove kore dibo

    
    
    // for participant_email1 =  senderEmail+'-'+receiverEmail;
    const filteredParticipantsEmail1 = participantsEmail.map(participantEmail => participantEmail.replace(currentLoggedInUserEmail+'-',''));
    // for participant_email2 =  receiverEmail+'-'+senderEmail;
    const filteredParticipantsEmail2 = filteredParticipantsEmail1.map(participantEmail => participantEmail.replace('-'+currentLoggedInUserEmail,''));
    
    // ei email gular // image and name show korbo .. 
    // conversationId niye .. message table er last message ta show korbo .. 
    // mane hocche most recent message  
    
    //const {}
    // eta amader ke shob user return korbe Seller Service theke 
    //⭕
    const sellers = await this.sellerService.findAll();
    // Property 'filter' does not exist on type 'Promise<Seller[]>
    

    const filteredSellers = await sellers.filter(seller => filteredParticipantsEmail2.includes(seller.sellerEmailAddress));
    
    


    // conversation id er maddhome message table er last message ta selected property te add korbo 

    const conversationsId :any = conversations.map(conversation => conversation.conversationId);

    //⭕const messages = this.messages.filter(message => conversationsId.includes(message.conversationId));

    //⭕ const messages = await this.messagesRepository.find({
    //   where: [
    //     { conversationId: conversationsId }, // 🛡️🛡️🛡️ not sure .. 
    //   ]
    // });

    const  selectedProperties : any =  filteredSellers.map(seller => {

      // ei seller er jonno message gula filter korte hobe
      
      const filteredMessages : any = this.messagesRepository.find({
        where: [
          { senderEmail: seller.sellerEmailAddress }, // Or Logic
          { receiverEmail: seller.sellerEmailAddress }, // 
        ]
      });


      // time stamp er maddhome last message ta ber korte hobe 🔰
      const lastMessage = filteredMessages[filteredMessages.length - 1].message; //🤔😢 bujhi nai
      const conversationId = filteredMessages[filteredMessages.length - 1].conversationId; //🤔😢 bujhi nai

      // ⏭️🔰- TODO  current logged in user sender / receiver jai hok .. conversation show korte hobe
      // ⏭️🔰🟢 = initial testing ok 
      return {
        sellerName : seller.sellerName,
        sellerPhoneNumber : seller.sellerPhoneNumber,
        lastMessage : lastMessage,
        conversationsId : conversationId,
        //image : seller.image, // 🔰
      }
    });

    return selectedProperties;
    
  }

  async showAllMessageOfAConversation(conversationId){
    // ei conversation id against e message table e joto message ase .. sob gula show korbo
    // decending order e .. 🔰 timestamp er maddhome 
    
    //const AllMessage = this.messages.filter(message => message.conversationId == conversationId);
    
    

    const AllMessage = await this.messagesRepository.find({
      where: [
        { conversationId: conversationId }, // 🛡️🛡️🛡️ not sure .. 
      ]
    });

    return AllMessage;
  }



  


  
}


 