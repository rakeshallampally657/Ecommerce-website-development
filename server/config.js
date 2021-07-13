import dotenv from 'dotenv';
dotenv.config();// it reads the url from env file

export default {
    SECRET_JWT_CODE: process.env.SECRET_JWT_CODE
 
    // mongodb_url: process.env.mongodb_url//it exports url and used in server.js file
  
};