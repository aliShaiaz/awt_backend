import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Message } from "./message.entity";
import { Seller } from "src/seller/entities/seller.entity";
import { Buyer } from "src/seller/entities/buyer.entity";

@Entity()
export class Conversation{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  conversationId : number;
  @Column()
  participantsEmail : string;

  @Column()
  lastMessage : string|null;

  @ManyToOne(() => Seller, { nullable: true })
  sellerId: Seller;

  @ManyToOne(() => Buyer, { nullable: true })
  buyerId: Buyer;

  @CreateDateColumn()
  timeStamps ?: Date;

  // 🔗One Conversation can have multiple messages
  @OneToMany(type => Message, message => message.conversation)
  message ? : Message[];

}
/////////// One Conversation can have multiple messages

/**
  
  1. Create New Conversation
        [ Front End ]
        -> 1. Message
        -> 2. Receiver Email 
        [After Submit]

        [ In Back End]
          1. collect receiver email
          2. collect message 

          -> validation 

          3. make participant_email1 =  senderEmail-receiverEmail
          4. make participant_email2 =  receiverEmail-senderEmail
          
          5. Check if already conversation exist or not in database 

              select conversation_id from conversation where participantEmail='".$participant_email."' OR participantEmail='".$participant_email2.

          6. Conversation Id exist na korle amra conversation  create korbo 

                        insert into conversation`(participantEmail) values('$participant_email') //  🔰 timeStamp add korte parle valo hoy 

                    7. Conversation Create houar pore .. ekhon amra message table e entry dibo 

                    8. Jei Conversation ta Create korsi .. shetar id ta amader lagbe ..
                    9. so, query kore conversation id ta collect kore nibo participant  email er maddhome 

                    10. Finally amra message table e entry dibo .. [senderEmail, receiverEmail, conversationId, message] // time stamp er maddhome time auto generate hobe 

          11. Conversation Id exist korle .. message table e entry dibo 

  2. current logged in user er jonno shob conversation show korbe

    current logged in user er (email / id) jodi kono conversation id er 
    participant email er moddhe paowa jay .. tailei amra logged in user ke 
    shei conversation ta show korbo .. 

    /**
     * // conversation initialize korar jonno receiver er email ta lagbe .. taile 
                // senderEmail-receiverEmail er maddhome ekta conversationId generate hobe .. 
                // then shei id er against e message table e message add hobe ..  
      upor e etar logic likha ase .. 
     */

     // now show all conversation 


     /** Logged in user er email Conversation table er ParticipantEmail er moddhe thaklei Thaklei shekhan theke 
                 * conversation id niye .. message table e shob gula message dekhabo .. sender or receiver email logged in user
                 * er shathe mille sheta ek side e dekhabo .. na mille sheta arek side e dekhabo .. timestamp hishebe ulta hoye 
                 * ashbe ..  
                 

     $sql = "SELECT conversation_id FROM local_bus_ticketing_system.conversation WHERE participantEmail LIKE '%".$_SESSION["email"]."%'";


     //🔴 eta age korsilam shob conversationId er against e  message table er shob gula message dekhabo 
     
     //🟢 but ekhon jeta korbo sheta hocche shob conversationId er against e .. / receiverEmail 
      ber kore ..
      receiver er database e search kore...  receiver er image and name show korbo 
      and conversation id er against e message table er last message  show korbo .. 
      and last message er time stamp show korbo ..

     
 */