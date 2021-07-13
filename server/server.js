import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import data from './data.js'
import User from './storage/user.js'
import bodyParser from 'body-parser';
import { generateToken } from './utils.js';
import expressAsyncHandler from 'express-async-handler';
// import { config } from 'dotenv';
// import config from './config.js';
// var cors= require("cors");
// const express= require("express");
// const data=require('./data.js');

const app=express();

app.use(cors());
app.use(express.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.get('/getproducts',(req,res)=>{
    res.send(data.products);

});

app.get('/getproduct/:id', function(req, res){
    var id = (req.params.id);
    const product= data.products.find((x)=>x._id===id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'product not found'});
    }
   
            
});




  mongoose
  .connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });



app.get('/api/users/createadmin', async(req,res)=>{
    try{
      const user=new User({
        name: 'rakesh',
        email: 'rakesh@gmail.com',
        password: 'rakesh',
        isAdmin: true
      });
      const createdUser= await user.save();
      res.send(createdUser);

    }
    catch(err){
      res.status(800).send({message:err.message});
    }
  });





  
  app.post(
    '/user/signin', expressAsyncHandler(async (req, res) => {
      const data={email:req.body.email,
        password:req.body.password};
      const signinUser = await User.findOne(data);
      if (!signinUser) {
        res.status(401).send({
          message: 'Invalid Email or Password',
        });
      } else {
        res.send({
          token:generateToken(signinUser),
          _id: signinUser._id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
       
        });
      }
    })
  );
   
  app.post(
    '/user/register', expressAsyncHandler(async (req, res) => {

      const user=new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      const registerUser= await user.save();
      if (!registerUser) {
        res.status(401).send({
          message: 'Invalid User Details',
        });
      } else {
        res.send({
          token:generateToken(registerUser),
          _id: registerUser._id,
          name: registerUser.name,
          email: registerUser.email,
          isAdmin: registerUser.isAdmin,
       
        });
      }
    })
  );


  app.put(
    '/user/:id', expressAsyncHandler(async (req, res) => {

      const foundUser= await User.findById(req.params.id);
      if (!foundUser) {
        res.status(404).send({
          message: 'User not found',
        });
      } else {
        foundUser.name = req.body.name  || foundUser.name;
        foundUser.email= req.body.email  || foundUser.email;
        foundUser.password =req.body.password  || foundUser.password;
        const updatedUser= await foundUser.save();
        
        res.send({

           token:generateToken(updatedUser),
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,

          
       
         } );
      }
    })
  );

  app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
  });

app.listen(500);
console.log("server 127.0.0.1:500");

