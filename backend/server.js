//create express application
require('dotenv').config();
const express = require('express');
const app = express();
const eventEmitter = require('node:events');
const {logTags} = require("./config/logTags");
const {logger} = require("./middleware/logger");
const {customMiddlewareLogger} = require("./middleware/logger");
const {customErrorMiddlewareLogger} = require("./middleware/logger");
const path = require("path")
const cors = require("cors");
const corsOptionsObject = require("./config/corsOptionsObject");
const mongooseConnection = require("./config/mongooseConnection");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//to connect to database
mongooseConnection();
class myEventEmitter extends eventEmitter{};

const myEmitter = new myEventEmitter();
//set up event handlers
myEmitter.on(logTags.DEBUG,(message)=>{
    let myLogger = new logger(message,logTags.DEBUG);
    myLogger.logDebug();
})

myEmitter.on(logTags.WARN,()=>{
    let myLogger = new logger(message,logTags.WARN);
    myLogger.logWarn();
})

myEmitter.on(logTags.INFO,()=>{
    let myLogger = new logger(message,logTags.DEBUG);
    myLogger.logInfo();
})

myEmitter.on(logTags.ERROR,()=>{
    let myLogger = new logger(message,logTags.DEBUG);
    myLogger.logError();
})


//built in middleware
app.use(customMiddlewareLogger);

//use built in middlewares here
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,"public")))
app.use(cors(corsOptionsObject));
//cookie parser here
app.use(cookieParser());

app.use('^/$|/index|/index.html',require('./routes/root'));
app.use('/authentication|/signin|/Login',require('./routes/authentication'))
app.use('/signup',require("./routes/signup"))

app.get('/*',(req,res)=>{
    res.status(404);
    res.send("Page not found");
})

app.use(customErrorMiddlewareLogger);
mongoose.connection.once("open",()=>{
    console.log("Mongoose connected")
    app.listen(process.env.PORT,()=>{
        //can log an info here
        myEmitter.emit(logTags.DEBUG,)
        console.log(`Server is listening at Port ${process.env.PORT}`);
    })
})

