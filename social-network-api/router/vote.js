const express = require('express');
const db = require('../config/db');
const VoteModel = db.socialNWDB.vote;
const router = express.Router();
// router.get('/',(req,res)=>{
//     res.send('route connection established')
// })

//method: POST
//desc: to like and dislike
//apiurl: http://localhost:3000/api/vote/add
router.post('/add',(req,res)=>{
    const req_post_id= req.body.post_id;
    const req_email = req.body.email;
    let req_vote = req.body.vote;
    if(req_vote==true){
        req_vote=true;
    }else{
        req_vote=false;
    }

    VoteModel.findAll({where : {post_id:req_post_id,email:req_email},raw:true})
    .then((voteUsers)=>{
        //check if one email has likes same post more times
        if(voteUsers.length>0){
            // if same email and post_id exists update data
            VoteModel.update({votes:req_vote}, {
                where:{
                    post_id:req_post_id,email:req_email
                }})
            .then((data)=>{
                res.send({
                         data : {message:'your vote is updated'},
                         status : 200
                
                         })
            })
            .catch((err)=>{
                throw err;
            })
        }
        else{
            //if  same email and post_id does not exists create the data
            VoteModel.create({
                post_id : req_post_id,
                votes : req_vote,
                email : req_email
        })
        .then((votedata)=>{
            res.send({
            data : {message:'your vote is added'},
            status : 200
    
            })
        })
        .catch((err)=>{
            res.send({
                data : {message:'not added'},
                status : 500,
                err :err
            })
        })
            
        }
    })
    .catch((err)=>{
        res.send({
                     data : {message:'not added'},
                     status : 500,
                     err :err
                 })
    })
    
})


//method: GET
//desc: this api will give all info including count of  likes and dislikes
//apiurl: http://localhost:3000/api/vote

router.get('/',(req,res)=>{
    VoteModel.findAll({attributes:['post_id'],raw:true})
    .then(async(votes)=>{
        for(const element of votes){
          let likeCount= await VoteModel.count({
                where:{
                votes : 1,
                post_id : element['post_id']

                }
            })
            let dislikeCount= await VoteModel.count({
                where:{
                votes : 0,
                post_id : element['post_id']

                }
            })
        element['likeCount']=likeCount;
        element['dislikeCount']=dislikeCount;
        }
        votes=Array.from(new Set(votes.map(JSON.stringify))).map(JSON.parse);
        res.send({
            data : votes,
            status : 200
    
            })
    })
    .catch((err)=>{
        res.send({
            data : {message:'problem in retrieving the posts'},
            status : 500,
            err :err
        })
    })
})

module.exports = router;
