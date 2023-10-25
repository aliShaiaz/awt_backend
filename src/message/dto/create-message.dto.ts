//🔰 validation use korte hobe 

import { IsString } from "class-validator";

export class CreateMessageDto{
  messageId : number;
  senderEmail : string;
  receiverEmail : string;
  conversationId : number;
  @IsString()
  message : string;
  timeStamps ?: Date; // 🔴 data type niye issue thakte pare

}