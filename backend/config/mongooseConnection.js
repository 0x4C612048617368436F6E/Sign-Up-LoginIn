const mongoose = require("mongoose");
//use logger here
const mongooseConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

    }catch(e){
        console.log(e);
    }
}

module.exports = mongooseConnection;