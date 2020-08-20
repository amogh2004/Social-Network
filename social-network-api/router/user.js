const express = require('express');
const UserModel = require('../config/db').socialNWDB.user;
const router = express.Router();

//@Method: GET
//Desc: Provide all usrs bio
//API url: http://localhost:3000/api/user/
router.get('/',(req,res) => {
    UserModel.findAll({attributes:['name','bio','user_img']})
    .then((usersdata)=>{
        /*usersdata.forEach(element => {
            element.user_img = element.user_img.toString();
        });*/
        usersdata.forEach(element => {
            if(element.user_img){
                element.user_img = element.user_img.toString();
        }});
        res.send({
            status: 200,
            data:usersdata
        })
    })
    .catch((err)=>{
        res.send({
            status:500,
            data:{message: 'Some Error while sending the user data'},
            err:err
        })
    })
})

module.exports = router;