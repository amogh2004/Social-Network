const express = require('express');
const db =require('../config/db');
const UserModel = db.socialNWDB;
const router = express.Router();
    router.get('/',(req,res)=>{
    res.send('auth route connection established')
})

//method:post
//desc:to add users
//api name:http://localhost:3000/api/auth/signup

router.post('/signup',(req,res)=>{
    //1. collect data from req
    let reqname = req.body.name;
    let reqemail= req.body.email;
    let reqpassword = req.body.password;
    let reqinsta_name=req.body.insta_name;
    let reqcountry=req.body.country;
    let reqbio=req.body.bio;

    //2. pass or store data to usertable
    UserModel.user.create({
        name : reqname,
        email : reqemail,
        passsword : reqpassword,
        insta_id : reqinsta_name,
        country : reqcountry,
        bio : reqbio
    }).then(()=>{
        res.send({
            message: "user added successfully",
            status : 200
        })
    })
    .catch(()=>{
    

        res.send({
            message : "user not added in server",
            status : 500
        })
    })
    
    
    
    //3. if data is added inform
    //4. if data not added inform



})
