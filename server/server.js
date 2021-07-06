import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import data from './data.js'
import config from '. /config.js';
// var cors= require("cors");
// const express= require("express");
// const data=require('./data.js');
const app=express();

app.use(cors());

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
  .connect(config.mongodb_url, {
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



app.listen(500);
console.log("server 127.0.0.1:500");

