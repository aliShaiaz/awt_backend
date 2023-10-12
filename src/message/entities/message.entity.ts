export class Message{
  messageId : number;
  senderEmail : string;
  receiverEmail : string;
  conversationId : number;
  message : string;
  timeStamps ?: Date; // 🔴 data type niye issue thakte pare 
}
/**
 * message seen unseen logic niye chinta korte hobe 
 * 
 * jodi ekta conversation e heat kora hoy .. 
 * i mean -> get requst kora hoy .. taile conversation er 
 * seen status valid hoye jabe .. 
 * 
 * jodi notun kono message insert hoy and message ta jodi amar 
 * na hoy .. taile conversation status unvalid hoye jabe amar jonno 
 * 
 * how about conversation e sender and receiver er jonno duita 
 * seen status thakbe .. 
 * 
 * conversation
 */