const User = require("../model/User");
const bcrypt = require("bcrypt");

const welcomeNewUser = (req,res)=>{
    res.status(200);
    res.send("Welcome to the Sign Up Page");
}

const handleNewUser = async (req,res)=>{
    //first thing we have to do is check if the username and password user pass in are not
    //empty strings
    if(req.accepts("html")){
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let Password = req.body.Password;
        let UserName = req.body.UserName;

        if(FirstName == "" || FirstName == undefined){
            //can not leave any field blank
            console.log("FirstName is blank");
            res.status(400);
            return res.send("Can not leave FirstName field blank");
        } else if(LastName == "" || LastName == undefined){
            //can not leave any field blank
            console.log("LastName is blank");
            res.status(400);
            return res.send("Can not leave LastName field blank");
        }else if(UserName == "" || UserName == undefined){
            //can not leave any field blank
            console.log("UserName is blank");
            res.status(400);
            return res.send("Can not leave UserName field blank");
        }else if(Password == "" || Password == undefined){
            //can not leave any field blank
            console.log("Password is blank");
            console.log(Password);
            res.status(400);
            return res.send("Can not leave Password field blank");
        }else{
            console.log(FirstName);
            console.log("All good");
            res.status(200);
        }
        
        //checking for duplicates
        const duplicate = await User.find({UserName:UserName})
        console.log(duplicate);
        if(duplicate.length > 0){
            console.log("UserName already registed");
            res.status(400);
            return res.send("UserName already registed");
        }
        else{
            console.log("UserName not already in Use");
        }
        //define saltRound
        let saltRound = 10;
        let hash;
        try{
            let salt = await bcrypt.genSalt(saltRound);
            let hash = await bcrypt.hash(Password,salt);
            //once everythign is ok, can create new documnent
            const doc = await User.create({
            FirstName:FirstName,
            LastName:LastName,
            UserName:UserName,
            Password:hash
            })

            res.status(200);
            return res.send(doc);
        }
        catch(e){
            console.log(e)
        }

    }else if(req.accepts("json")){
        console.log("JSON")
        console.log(req.body.FirstName);
        console.log(req.body.LastName);
        console.log(req.body.Password);

        res.status(200);
        res.json({message:req.body.FirstName});
    }else{
        console.log("Other");
        console.log(req.get('Accept'));
        res.status(200);
        res.send(req.body.FirstName);
    }
}

module.exports = {welcomeNewUser,handleNewUser};