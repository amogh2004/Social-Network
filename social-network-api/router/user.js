const express = require('express');
const db = require('../config/db');
const UserModel = db.socialNWDB;
const router = express.Router();
// router.get('/',(req,res)=>{
//     res.send('user route connection established')
// })

//method: get
//desc: to get users bio
//api name : http://localhost:3000/api/user/

router.get('/',(req,res)=>{
    UserModel.user.findAll({
        attributes: ['name', 'bio','user_image']
      })
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