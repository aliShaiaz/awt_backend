import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file🟢🟢🟢🟢🟢🔰🔰
dotenv.config({ path: path.join(__dirname, '../.env') });


const DB_PASSWORD = process.env.DB_PASSWORD;

const config:any | PostgresConnectionOptions = {
  type: 'postgres', 
  host:'localhost', // database host name 
  post: 5432, 
  username: 'postgres', // new
  
  password:DB_PASSWORD,
  database : 'awt_backend', // database name  
  //entities : [Feedback, User], // dist er pore src thakbe na 
  autoLoadEntities : true, // // not for production version 
  synchronize : true, // production e true rakha jabe na  // 
  //lazyRelations : true
  //logging : true,
}

export default config;