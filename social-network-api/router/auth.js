const express = require('express');
const db =require('../config/db');
const UserModel = db.socialNWDB;
const router = express.Router();
//     router.get('/',(req,res)=>{
//     res.send('auth route connection established')
// })

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
    let requser_image;
    if(req.body.user_image)
    {
        requser_image = req.body.user_image;
    }

    //2. pass or store data to usertable

    //if user's email is present in db then do not store the data and we should send a response 
    //that user already exists
    UserModel.user.create({
        name : reqname,
        email : reqemail,
        passsword : reqpassword,
        insta_id : reqinsta_name,
        country : reqcountry,
        bio : reqbio,
        user_image : requser_image
    })
    //3. if data is added inform
    .then(()=>{
        res.send({
            message: "user added successfully",
            status : 200,
            email : reqemail,
            user_image : requser_image
        })
    })
    //4. if data not added inform
    .catch(()=>{
        res.send({
            message : "user not added in server",
            status : 500
        })
    })
})


//method : post
//desc : to check credentials and respond to UI
//apiname : http://localhost:3000/api/auth/signin

router.post('/signin',(req,res)=>{

    const req_email = req.body.email;
    const req_password = req.body.password;

    UserModel.user.findOne({where: {
        email : req_email,
        passsword : req_password
    },raw:true})
    .then((usersdata)=>{
        if(usersdata)
        {
            res.send({
                message: "user signin successfull",
                status : 200,
                email : req_email

            }) 
        }else{
            res.send({
                message: "Invalid Email Id or Password please Signup",
                status : 404
            })
        }
    })
    .catch((err)=>{
        res.send({
            message : "user not able to sign in",
            status : 500
        })
    })
      
})



//method: get
//desc: to get users info
//api name : http://localhost:3000/api/auth/

router.get('/',(req,res)=>{
    const req_email = req.query.email;
    UserModel.user.findAll({ where: { email:req_email },raw:true })
    .then((usersdata)=>{
        usersdata.forEach(element=>{
            if(element.user_image){
                element.user_image=element.user_image.toString();
        }})
        res.send({
            data : usersdata,
            status : 200
        })
    })
    .catch((err)=>{
        res.send({
            data : {message:'data not found'},
            status : 500,
            err:err
        })
    })
})
module.exports = router;