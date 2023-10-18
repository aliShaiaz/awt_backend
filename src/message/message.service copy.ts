import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SellerService } from 'src/seller/seller.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/seller/entities/seller.entity';
import { In, Repository } from 'typeorm';
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
    let existFlag : boolean = false;  
    let againExistFlag : boolean = false;  
  const {receiverEmail, message, senderEmail} = createMessageDto;
    const newMessage = {
      messageId : Date.now(),
      senderEmail : senderEmail, // html input type hidden 
      receiverEmail : receiverEmail,
      message : message,
      // createdAt: Date,
      // updatedAt: Date
    }
    console.log("new Message Created 1. ",newMessage);
    // check conversation already exist or not 
    

    const participant_email1 =  senderEmail+'-'+receiverEmail;
    const participant_email2 =  receiverEmail+'-'+senderEmail;

    //const conversation = this.conversationsRepository.find(conversation => conversation.participantsEmail === participant_email1 || conversation.participantsEmail === participant_email2);
    
    const conversation : any = await this.conversationsRepository.findOne({
      where: [
        { participantsEmail: participant_email1 }, // 🛡️🛡️🛡️ we need OR logic here .. 
        { participantsEmail: participant_email2 },
      ],
      // select: ["conversationId"]
    });
    
    if(conversation){
      console.log(" ============== previous conversation found", conversation);
      console.log(conversation)
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
      console.log(" ============== conversation does not exist============");
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
        existFlag = true;

        const participantsAreInDB =  await this.buyersRepository.findOne({ 
          where: [
            {BuyerEmail : senderEmail},
            {BuyerEmail : receiverEmail}
          ]
        });
        if(participantsAreInDB){
          againExistFlag = true;
          console.log("sender email or receiver email are in buyerRepository ")
        }else{
          console.log("not exist in sellerRepository or buyerRepository ")
          
        }

      }else{
        const participantsAreInDB =  await this.buyersRepository.findOne({ 
          where: [
            {BuyerEmail : senderEmail},
            {BuyerEmail : receiverEmail}
          ]
        });
        if(participantsAreInDB){
          againExistFlag = true;
          console.log("sender email or receiver email are in buyerRepository ")
        }else{
          console.log("not exist in sellerRepository or buyerRepository ")
        }
      }

      if(existFlag && againExistFlag){
      
        // 🟢 lets call createNewConversation service function to do that 
        const newConversation = {
          participantsEmail : participant_email1,
          lastMessage : message,
          //timeStamps : Date.now()
          timeStamps : new Date().toISOString(),
        }
        console.log(" ============== newConversation Creation done", newConversation);
        const newCreatedConversation =  await this.createNewConversation(newConversation);
        const newlyCreatedConversationId = newCreatedConversation.conversationId;
        console.log(newCreatedConversation, " newlyCreatedConversationIdd ======2. ",newlyCreatedConversationId);
        // jei conversatioin ta create korlam .. shetar id amar jana lagbe 

        // new message with conversation id
        const newMessageWithConversationId = {
          ...newMessage,
          conversationId : newlyCreatedConversationId
        }
        console.log("newMessageWithConversationId :   :: 3", newMessageWithConversationId)

        // its time to save this in message table 
        this.messagesRepository.create(newMessageWithConversationId);
        this.messagesRepository.save(newMessageWithConversationId);
        return newMessageWithConversationId;
        }else{
          // console.log((new Date()).toISOString());
          // console.log(new Date().toLocaleString());
          // console.log(Date.now().toLocaleString());
          console.log("Conversation Can not created")
        }
      }

      
      
    //😢 ekhane ki kichu return korar dorkar ase ? 
  }

  // I think done 🟢
  async createNewConversation(createConversationDto/*: CreateConversationDto */) : Promise<Conversation> {
    const {participantsEmail, timeStamps, sellerId, buyerId, lastMessage} = createConversationDto;
    // participantsEmail er throw te .. seller and buyer er id khuje ber korte hobe 
    // then sheta newConversation object er vitor e pass korte hobe 
    const newConversation = {
      //conversationId : Date.now(),
      conversationId : new Date().getSeconds(), //getTime() 
      participantsEmail : participantsEmail,
      timeStamps : timeStamps,
      sellerId : sellerId,
      buyerId : buyerId ,
      lastMessage : lastMessage
    }
    this.conversationsRepository.create(newConversation);
    // this.conversationsRepository.save(newConversation); // eta likha e lagbe 
    // return newConversation; 
    return this.conversationsRepository.save(newConversation); // eta likha e lagbe ;
    //return 'This action adds a new message';
  }
  
  async showAllConversationToCurrentLoggedInUser(currentLoggedInUserEmail : string) /*:Promise<Conversation[]>*/ {   
    // console.log("In service ... 1")
    // current logged in user jodi participant email er moddhe thake .. taile shei conversation show korbo
    
    //🟢🟢🟢🟢 const conversations = await this.conversationsRepository.find({
    //   where: [
    //     { participantsEmail: currentLoggedInUserEmail }, // 🛡️🛡️🛡️ not sure .. 
    //   ]
    // });

    const conversations = await this.conversationsRepository
      .createQueryBuilder('conversation')
      .where('conversation.participantsEmail ILIKE :email', {
        email: `%${currentLoggedInUserEmail}%`,
      })
      .getMany();

    if(conversations){
      // console.log("found conversations ...OK 2" , conversations);
    }


    const participantsEmail = conversations.map(conversation => conversation.participantsEmail);

    // ekhon participantsEmail er moddhe theke currentLoggedInUserEmail remove kore dibo

    if(participantsEmail){
      // console.log("found participantsEmail ... 3", participantsEmail)
    }
    
    
    // for participant_email1 =  senderEmail+'-'+receiverEmail;
    const filteredParticipantsEmail1 = participantsEmail.map(participantEmail => participantEmail.replace(currentLoggedInUserEmail+'-',''));
    // for participant_email2 =  receiverEmail+'-'+senderEmail;
    const filteredParticipantsEmail2 = filteredParticipantsEmail1.map(participantEmail => participantEmail.replace('-'+currentLoggedInUserEmail,''));
    // remove done 🟢

    if(filteredParticipantsEmail1 && filteredParticipantsEmail2){
      //console.log("found filteredParticipantsEmail 1 and 2 ... done 4",filteredParticipantsEmail2 )
    }

    // ei email gular // image and name show korbo .. 
    // conversationId niye .. message table er last message ta show korbo .. 
    // mane hocche most recent message  

    // 🟢🟢🟢 ekhon buyer table and seller table dui table thekei amake email address er against e 
    // seller or buyer er  name and image ta ber korte hobe ..
    
    const emailToString = filteredParticipantsEmail2.toString();
    
    //const buyers = await this.buyersRepository.find();

    const buyers = await this.buyersRepository.find({
      select: ["BuyerFirstName", "BuyerId", "BuyerEmail"], // Select only the 'name' column
      where: {
        BuyerEmail: In(filteredParticipantsEmail2), // Match against the list of emails
      },
    });

    // console.log("---- buyers ---", buyers);

    const sellers = await this.sellersRepository.find({
      select: ["sellerName", "id", "sellerEmailAddress"], // Select only the 'name' column
      
      where: {
        sellerEmailAddress: In(filteredParticipantsEmail2), // Match against the list of emails
      },
    });

    // console.log("---- sellers ---", sellers);


    /**
     * 
     */

    // const conversation = await this.conversationsRepository
    //   .createQueryBuilder('conversation')
    //   .select('conversation.lastMessage', 'lastMessage')
    //   .where('conversation.participantsEmail = :participantsEmail', { filteredParticipantsEmail2 })
    //   .getOneOrFail();
    const conversation = await this.conversationsRepository
  .createQueryBuilder('conversation')
  .select('conversation.lastMessage', 'lastMessage')
  .where('conversation.participantsEmail = :participantsEmail', {
    participantsEmail: filteredParticipantsEmail2,
  })
  .getMany();


    console.log("conversation =>>>>=>>>>", conversation)

    const  selectedProperties2 : any = await buyers.map(buyer => {
      //let filterBro = findMessageFromMessageRepoByEmail(buyer.BuyerEmail);
      
      // lets pull conversations last message by email 
      // conversations er participants email er moddhe jodi buyer er email exist kore 
      // tahole .. last message ta show korbo 

      return {
        userName : buyer.BuyerFirstName,
        userPhoneNumber : buyer.BuyerPhoneNo,
        message : conversation
      }
    });

    console.log("filteredMessages1->>>>> : :::::" , selectedProperties2);


    const findMessageFromMessageRepoByEmail = (email) =>{ 
      let filteredMessages1 : any  = this.messagesRepository.find({
        where: [
          { senderEmail: email }, // Or Logic
          { receiverEmail: email }, // 
        ]
      });
      return filteredMessages1;
    }

    ;
    


      const  selectedProperties1 : any =  sellers.map(seller => {
        const filteredMessages1 : any = this.messagesRepository.find({
          where: [
            { senderEmail: seller.sellerEmailAddress }, // Or Logic
            { receiverEmail: seller.sellerEmailAddress }, // 
          ]
        });

        
        return {
          userName : seller.sellerName,
          userPhoneNumber : seller.sellerPhoneNumber,
          message : filteredMessages1
        }
      });  
      
      console.log("filteredMessages1 : :::::" , selectedProperties1);


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


 