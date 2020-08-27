const express = require('express');
const db = require('../config/db');
const PostModel = db.socialNWDB;
const VoteModel = db.socialNWDB.vote;
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
// router.get('/',(req,res)=>{
//     res.send('post route connection established')
// })

//file will be stored in the buffer
const upload = multer({ storage: storage })

//method:post
//desc: to add posts
//api name: http://localhost:3000/api/post/addpost
router.post('/addpost',upload.single('loc_image'),(req,res)=>{
    //1. collect data from req
    let reqloc_name = req.body.loc_name;
    let reqloc_desc = req.body.loc_desc;
    let reqloc_img = req.file.buffer;
    let req_email = req.body.email;
    console.log(req.file);

    //2. pass or store data to post table
    PostModel.post.create({
        
        loc_name : reqloc_name,
        loc_desc : reqloc_desc,
        loc_img : reqloc_img,
        email : req_email
    }).then((data)=>{
            res.send({
                data:{message: "post added successfully"},
                status : 200
            }) 
    })
    .catch((err)=>{
            res.send({
                data:{message : "post not added to server"},
                status : 500,
                err:err
        
            })
    })


})

//method : GET
//desc: provide all posts
//api url:http://localhost:3000/api/post/
 router.get('/',(req,res)=>{
     let allPostData =[];
    PostModel.post.findAll()
    .then(async(postsdata)=>{
        // postsdata.forEach(element=>{
            
        //     if(element.loc_img){
        //     element.loc_img=element.loc_img.toString();
        // }})
        for(const element of postsdata)
        {
            let postObj={};
            postObj.loc_name = element['loc_name'];
            postObj.loc_desc = element['loc_desc'];
            let likeObj=await getLikesAndDislikes(element.post_id)
            if(element.loc_img){
                     element.loc_img='data:image/jpg;base64,'+element.loc_img.toString('base64');
            }
            postObj.loc_img = element['loc_img'];
            postObj.email = element['email'];
            postObj.likeCount = likeObj.likeCount;
            postObj.dislikeCount=likeObj.dislikeCount;
            postObj.post_id = element.post_id;
            allPostData.push(postObj);
        }
        res.send({
            status : 200,
            data : allPostData
        });
    })
    .catch((err)=>{
        res.send({
            status:500,
            data : {message:'some error'},
            err : err
        })

    })
 })

  let getLikesAndDislikes=async(postId)=>{
        
          let likeCount= await VoteModel.count({
                where:{
                votes : 1,
                post_id : postId
                }})
            let dislikeCount= await VoteModel.count({
                where:{
                votes : 0,
                post_id : postId

                }})
        return{
            likeCount:likeCount,
            dislikeCount:dislikeCount
        }
    }
module.exports = router;