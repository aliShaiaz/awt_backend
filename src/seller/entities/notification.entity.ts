import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Notification{
  notificationId : number;
  notificationDetails :string;
  @CreateDateColumn()
  createdAt: Date; // Automatically saves the creation date and time

  @UpdateDateColumn()
  updatedAt: Date; // Automatically saves the last update date and time

}

/**
 * notification e amra aro information dekhai 
 * like 
 * 1. jei product er bepar e .. shetar 
 *         -> image , name, stockValue, price, 
 */

/**
 * 🔰 jei din product er stock value update kora hoise .. 
 * shei din er date / timestamp ta store kora thakbe .. 
 * 
 * then product er avaiable stock jokhon shesh hoye jabe .. tokhon abar date store hobe .. 
 * 
 * then duita date compare kore .. seller ke dekhabe .. last stock e koto gula product dhuksilo .. 
 * and koto din er moddhe product ta shesh hoise .. shetar notification dekhabe .. 
 * 
 * 🔰 dashboard nam e ekta jayga thakbe .. shekhan eo shob product er erokom status thakbe .. 
 */