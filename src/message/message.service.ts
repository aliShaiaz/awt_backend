import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SellerService } from 'src/seller/seller.service';

@Injectable()
export class MessageService {
  /**
   * 🤔🙋‍♂️❓seller and buyer ki duita alada table e store korbo ? 
   * naki same table e store korbo .. 
   * 
   * ❓seller service e ekta variable declare kora ase ... sheta amar message service e access 
   * kora lagbe .. ekhon ami ki korbo .. 
   */
  constructor(private sellerService : SellerService){}

  private readonly messages:Message[] = [
    {
      messageId : 1,
      senderEmail : 'a@gmail.com',
      receiverEmail : 'b@gmail.com',
      conversationId : 1,
      message : 'sender : a ........ receiver b'
    },{
      messageId : 2,
      senderEmail : 'b@gmail.com',
      receiverEmail : 'a@gmail.com',
      conversationId : 1,
      message : 'sender : b ........ receiver a' // 1 count 
    },
    {
      messageId : 3,
      senderEmail : 'a@gmail.com',
      receiverEmail : 'c@gmail.com',
      conversationId : 2,
      message : 'sender : a ........ receiver c' // 2 count
    },{
      messageId : 4,
      senderEmail : 'c@gmail.com',
      receiverEmail : 'a@gmail.com',
      conversationId : 2,
      message : 'sender : c ........ receiver a'
    },
    {
      messageId : 5,
      senderEmail : 'a@gmail.com',
      receiverEmail : 'd@gmail.com',
      conversationId : 3,
      message : 'sender : a ........ receiver d'
    }
  ];

  private readonly conversations:Conversation[] = [
    {
      conversationId : 1,
      participantsEmail : 'a@gmail.com-b@gmail.com'
      
    },
    {
      conversationId : 2,
      participantsEmail : 'a@gmail.com-c@gmail.com'
      
    },
    {
      conversationId : 3,
      participantsEmail : 'd@gmail.com-a@gmail.com'
      
    }
  ];

  // I think done 🟢
  createNewMessage(createMessageDto /*: CreateMessageDto*/, senderEmail:string) {
    const {receiverEmail, message} = createMessageDto;
    const newMessage = {
      messageId : Date.now(),
      senderEmail : senderEmail,
      receiverEmail : receiverEmail,
      message : message
    }

    // check conversation already exist or not 

    const participant_email1 =  senderEmail+'-'+receiverEmail;
    const participant_email2 =  receiverEmail+'-'+senderEmail;

    const conversation = this.conversations.find(conversation => conversation.participantsEmail === participant_email1 || conversation.participantsEmail === participant_email2);
    if(conversation){
      const {conversationId} = conversation;
      // conversation exist 
      // add message in message table 
      const newMessageWithConversationId = {
        ...newMessage,
        conversationId : conversationId
      }
      
      this.messages.push(newMessageWithConversationId);
      return newMessageWithConversationId;
    }else{
      // conversation does not exist 
      // create a conversation with participant_email and timeStamps
      
      // 🟢 lets call createNewConversation service function to do that 
      const newConversation = {
        participantsEmail : participant_email1,
        timeStamps : Date.now()
      }
      this.createNewConversation(newConversation);

      // jei conversatioin ta create korlam .. shetar id amar jana lagbe 

      const conversation = this.conversations.find(conversation => conversation.participantsEmail === participant_email1 || conversation.participantsEmail === participant_email2);

      const {conversationId} = conversation;

      // new message with conversation id
      const newMessageWithConversationId = {
        ...newMessage,
        conversationId : conversationId
      }

      // its time to save this in message table 
      this.messages.push(newMessageWithConversationId);
      return newMessageWithConversationId;
    }
    //😢 ekhane ki kichu return korar dorkar ase ? 
  }

  // I think done 🟢
  createNewConversation(createConversationDto/*: CreateConversationDto */) {
    const {participantsEmail, timeStamps} = createConversationDto;
    const newConversation = {
      conversationId : Date.now(),
      participantsEmail : participantsEmail,
      timeStamps : timeStamps
    }
    this.conversations.push(newConversation);
    return 'This action adds a new message';
  }
  
  showAllConversationToCurrentLoggedInUser(currentLoggedInUserEmail : string) {
    // Logged in user er email Conversation table er ParticipantEmail er moddhe thaklei Thaklei shekhan theke
    // conversation gula show korbo 

    const conversations = this.conversations
    .filter(conversation => conversation.participantsEmail.includes(currentLoggedInUserEmail));
    

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
    const sellers = this.sellerService.findAll();
    const filteredSellers = sellers.filter(seller => filteredParticipantsEmail2.includes(seller.sellerEmailAddress));
    
    


    // conversation id er maddhome message table er last message ta selected property te add korbo 

    const conversationsId = conversations.map(conversation => conversation.conversationId);

    const messages = this.messages.filter(message => conversationsId.includes(message.conversationId));


    const  selectedProperties =  filteredSellers.map(seller => {



      // ei seller er jonno message gula filter korte hobe
      const filteredMessages = messages.filter(message => message.senderEmail === seller.sellerEmailAddress || message.receiverEmail === seller.sellerEmailAddress);

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

  showAllMessageOfAConversation(conversationId){
    // ei conversation id against e message table e joto message ase .. sob gula show korbo
    // decending order e .. 🔰 timestamp er maddhome 
    
    const AllMessage = this.messages.filter(message => message.conversationId == conversationId);
    return AllMessage;
  }



  


  
}
