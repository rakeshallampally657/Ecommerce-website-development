import dotenv from 'dotenv';
dotenv.config();// it reads the url from env file

export default {
 
    mongodb_url: process.env.mongodb_url,//it exports url and used in server.js file
  
};