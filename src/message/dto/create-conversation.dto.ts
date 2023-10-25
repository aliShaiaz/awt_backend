import { IsString } from "class-validator";

//🔰 validation use korte hobe 
export class CreateConversationDto{
  conversationId : number;
  @IsString()
  participantsEmail : string;
  timeStamps ?: Date;
  // createdAt ?: Date; // Automatically saves the creation date and time

  // updatedAt ?: Date; // Automatically saves the last update date and time
}