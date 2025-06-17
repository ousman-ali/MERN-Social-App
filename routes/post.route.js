const router = require("express").Router();
const postModel = require("../models/postModel.js");
const userModel = require("../models/userModel");


//CREATE A POST
router.post("/create", async (req, res)=>{
    const newPost = new postModel(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE A POST
router.put("/update/:id", async (req, res)=>{
    try {
        const post = await postModel.findById(req.params.id); // first find the post in dB
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("your post has been updated");
        } else{
            return res.status(403).json("you can update only your post");
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE A POST
router.delete("/delete/:id", async (req, res)=>{
    try {
        const post = await postModel.findById(req.params.id); // first find the post in dB
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("you have deleted the post");
        } else{
            return res.status(403).json("you can delete only your post");
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

//LIKE A POST
router.put("/:id/like", async (req, res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("the post has been liked")
        } else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("the post has been disliked") 
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET A POST
router.get("/find/:id", async (req, res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET timeline POSTS - all followings and all posts of the users
router.get("/timeline", async (req, res)=>{
    try {
        const currentUser = await userModel.findById(req.body.userId);
        const userPost = await postModel.find({userId: currentUser._id});
        const friendPost = await Promise.all(
            currentUser.following.map(friendId=>{
               return postModel.find({userId: friendId});
            })
        );
        res.status(200).json(userPost.concat(...friendPost));
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router