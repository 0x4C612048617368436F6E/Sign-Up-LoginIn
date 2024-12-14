const mongoose = require("mongoose");
const {Schema} = require("mongoose");

//What can user have:
/*
1.) First Name
2.) LasttName
3.) Password

Just a simple Login/Registration Site
*/

const  userSchema = new Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },//passwoord will be hashed

    //lastly, we need refresh token to cross-refernce
    refreshToken:{
        type:String
    }
})

//create model
const user = mongoose.model("User",userSchema);

module.exports = user;

