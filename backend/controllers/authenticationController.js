const JWT = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcrypt");

const welcomeUserToAuthentication = (req,res)=>{
    res.status(200);
    res.send("Welcome to the Authentication Page");
}

const authenticateUser = async(req,res)=>{
    //check the type of resource that is accepted
    if(req.accepts('html')){
        //Once a user signs in, they will be redirected here to login and then will be given a access and refresh token

        //So user will need to enter their email and password
        let UserName = req.body.UserName;
        let Password = req.body.Password;
        if(UserName == "" || UserName == undefined){
            res.satus(401);
            return res.send("Can not leave UserName field blank");
        }
        if(Password == "" || Password == undefined){
            res.status(401);
            return res.send("Can not leave Password Fieldd blank");
        }
        //here we are set to go, First check if a user with username Exist, so find them
        try{
            const doesUserWithUserNameExist = await User.find({UserName:UserName});
            //check if it does not exists
            if(!doesUserWithUserNameExist){
                res.status(402);
                return res.send("UserName and or password are wrong");
            }
            //Next we get the password
            const valid = await bcrypt.compare(Password,doesUserWithUserNameExist.Password);
            if(valid){
                //then we generate the access and refresh token
                //here we initiate access Token and Refresh Token
                let accessToken = JWT.sign({
                    UserName:UserName //Will only use  userName
                },process.env.ACCESS_TOKEN,{expiresIn:'1m'});

                let refreshToken = JWT.sign({
                    UserName:UserName
                },process.env.REFRESH_TOKEN,{expiresIn:24*60*60*1000})
                //once that is done, we will need to update the UserDatabase to add the refresh token in there so we can cross-refernce it
                const filter = {Username:UserName};
                const update = {refreshToken:refreshToken};
                let doc = await User.findOneAndUpdate(filter,update);
                
                doc = await User.findOne(filter);
                console.log(doc);
                //Next we are going to send the access token as json and the refresh as cookie
                res.cookie("JWTREFRESHTOKEN",refreshToken);
                res.json({accessToken:accessToken});
            }else{
                res.status(401);
                res.send("Password is Incorrect");
            }
        }catch(e){
            console.log(e)
        }
    }
    else if(req.accepts('json')){
        res.status(200);
        res.json({message:"Welcome to the Home page"});
    }else{
        res.status(200);
        res.send("Welcome to the Home Page");
    }
}

module.exports = {welcomeUserToAuthentication,authenticateUser};