const router = require("express").Router();
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res)=>{

    try {
        //generate new password-hashed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //save user in to dB and return response
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
})

//LOGIN
router.post("/login", async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router