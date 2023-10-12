import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Message{
  @PrimaryGeneratedColumn()
  messageId : number;
  @Column()
  senderEmail : string;
  @Column()
  receiverEmail : string;
  @Column()
  conversationId : number;
  @Column()
  message : string;
  @Column()
  timeStamps ?: Date; // 🔴 data type niye issue thakte pare 
}
////////// Multiple Message can be in one Conversation


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