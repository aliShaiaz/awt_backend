//🔰 validation use korte hobe 

export class CreateMessageDto{
  messageId : number;
  senderEmail : string;
  receiverEmail : string;
  conversationId : number;
  message : string;
  timeStamps ?: Date; // 🔴 data type niye issue thakte pare
}