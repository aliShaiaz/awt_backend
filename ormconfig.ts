import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config:any | PostgresConnectionOptions = {
  type: 'postgres', 
  host:'localhost', // database host name 
  post: 5432, 
  username: 'postgres', // new
  password : 'root', //🔰 give password
  //password:process.env.DB_PASSWORD,
  database : 'awt_backend', // database name  
  //entities : [Feedback, User], // dist er pore src thakbe na 
  autoLoadEntities : true, // // not for production version 
  synchronize : true, // production e true rakha jabe na  // 
  
}

export default config;