const router = require("express").Router();
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");

//UPDATE USER
router.put("/update/:id", async (req, res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        //updating password
        if (req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error)
            }
        }

        //updating user
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});

            if (!user) {
                return res.status(404).json("User not found");
            }

            res.status(200).json("account has been updated");

        } catch (error) { 
            return res.status(500).json(error)
        }

    } else{
        return res.status(403).json("you can update only your account");
    } 
})

//DELETE USER
router.delete("/delete/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).json("account has been deleted successfully !")
            
        } catch (error) {
            return res.status(500).json(error)
        }
    } else{
        return res.status(403).json("you are not allowed to delete this account")
    }
    
})

//GET USER
router.get("/find/:id", async (req, res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        if (!user) {
                return res.status(404).json("User not found");
            }
        return res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error);
    }
})

//FOLLOW USER
router.put("/:id/follow", async (req, res)=>{
    if( req.body.userId !== req.params.id ){
        try {
            const user = await userModel.findById(req.params.id); //find the user with the id in route
            const currentUser = await userModel.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({$push: {following: req.params.id}})
                res.status(200).json("user has been followed");
            } else{
                res.status(403).json("you already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else{
        res.status(403).json("ypu can not follow your self")
    }
})

//UNFOLLOW USER
router.put("/:id/unfollow", async (req, res)=>{
    if( req.body.userId !== req.params.id ){
        try {
            const user = await userModel.findById(req.params.id); //find the user with the id in route
            const currentUser = await userModel.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentUser.updateOne({$pull: {following: req.params.id}})
                res.status(200).json("user has been unfollowed");
            } else{
                res.status(403).json("you do not follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else{
        res.status(403).json("thats not possible")
    }
})

module.exports = router