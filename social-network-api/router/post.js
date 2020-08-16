const express = require('express');
const db = require('../config/db');
const PostModel = db.socialNWDB;
const router = express.Router();
router.get('/',(req,res)=>{
    res.send('post route connection established')
})

//method:post
//desc: to add posts
//api name: http://localhost:3000/api/post/addpost
router.post('/addpost',(req,res)=>{
    //1. collect data from req
    let reqpost_id = req.body.post_id;
    let reqloc_name = req.body.loc_name;
    let reqloc_desc = req.body.loc_desc;
    //let reqloc_img = req.body.loc_img;

    //2. pass or store data to post table
    PostModel.post.create({
        post_id : reqpost_id,
        loc_name : reqloc_name,
        loc_desc : reqloc_desc,
        //loc_img : reqloc_img
    }).then(()=>{
            res.send({
                message: "post added successfully",
                status : 200
            }) 
    })
    .catch(()=>{
            res.send({
                message : "post not added to server",
                status : 500
            })
    })


})

