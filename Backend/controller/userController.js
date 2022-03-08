const asyncHandler =require("express-async-handler");
const User = require('../models/userModels');

const registerUser = asyncHandler (async (req,res) => {
    const { name, email, password, pic} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,email,password,pic,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
        });
    }
    else{
        res.status(400);
        throw new Error("Error occurred");
    }


    res.json({
        name, email
    });
});

module.exports = {registerUser} ;