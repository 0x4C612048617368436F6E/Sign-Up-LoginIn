const path = require('path');
//const fsPromise = require('fs').promises;
const fsPromise = require('node:fs/promises');
const fs = require("fs");

class logger{

    constructor(message,logTag){
        this.directoryLogFile = path.join(__dirname,"..","logger");
        this.logFile = path.join(__dirname,"..","logger","LogFile.log");
        this.time = new Date();
        //split time into hour. minute and seconds
        this.hour = this.time.getHours();
        this.minute = this.time.getMinutes();

        this.fullTime = this.hour + ":" + this.minute

        //to get date, need to do same as above, so get day, month and year
        this.day = String(this.time.getDay()).padStart(2,"0");
        this.month = String(this.time.getMonth).padStart(2,"0");
        this.year = String(this.time.getFullYear());

        this.fullYear = this.day + "/" + this.month + "/" + this.year;
        this.logTag = logTag
        this.message = message;

        //append all the information
        this.fullMessage = this.fullTime + this.fullYear + this.logTag + this.message
    }
    async logInfo(){
        //For logging Messages 
        //check if given file exists, if not create
        if(fs.existsSync(this.logFile)){
            //some log messages
            console.log("File exists")
            //so if file exist, all we need to do is write to the file the message
            /*
            The format of our logger will be like:
            1.) Have time
            2.) Have date
            3.) Debug Information
            4.) The actual information
            */

            //returns promise
            try{
                //create the directory
                await fsPromise.appendFile(this.logFile,this.fullMessage)
            }
            catch(e){
                //will console log the error for now
                console.log(e);
            }
            return;
        }
        //this will be done if folder does not exists

        //first create repository
        try{
            fsPromise.mkdir(this.directoryLogFile);
            fsPromise.writeFile(this.logFile,this.fullMessage)
        }catch(e){
            console.log(e)
        }
        return;

    }

    async logWarn(){
        //we will do the same thing for the warning
        //For logging Messages 
        //check if given file exists, if not create
        if(fs.existsSync(this.logFile)){
            //some log messages
            console.log("File exists")
            //so if file exist, all we need to do is write to the file the message
            /*
            The format of our logger will be like:
            1.) Have time
            2.) Have date
            3.) Debug Information
            4.) The actual information
            */

            //returns promise
            try{
                await fsPromise.appendFile(this.logFile,this.fullMessage)
            }
            catch(e){
                //will console log the error for now
                console.log(e);
            }
            return;
        }
        //this will be done if folder does not exists

        //first create repository
        try{
            fsPromise.mkdir(this.directoryLogFile);
            fsPromise.writeFile(this.logFile,this.fullMessage)
        }catch(e){
            console.log(e)
        }
        return;

    }

    async logDebug(){
        //we will do the same thing for the Debug
        //For logging Messages 
        //check if given file exists, if not create
        if(fs.existsSync(this.logFile)){
            //some log messages
            console.log("File exists")
            //so if file exist, all we need to do is write to the file the message
            /*
            The format of our logger will be like:
            1.) Have time
            2.) Have date
            3.) Debug Information
            4.) The actual information
            */

            //returns promise
            try{
                await fsPromise.appendFile(this.logFile,this.fullMessage)
            }
            catch(e){
                //will console log the error for now
                console.log(e);
            }
            return;
        }
        //this will be done if folder does not exists

        //first create repository
        try{
            fsPromise.mkdir(this.directoryLogFile);
            fsPromise.writeFile(this.logFile,this.fullMessage)
        }catch(e){
            console.log(e)
        }
        return;

    }


    async logError(){
        //we will do the same thing for the error
        //For logging Messages 
        //check if given file exists, if not create
        if(fs.existsSync(this.logFile)){
            //some log messages
            console.log("File exists")
            //so if file exist, all we need to do is write to the file the message
            /*
            The format of our logger will be like:
            1.) Have time
            2.) Have date
            3.) Debug Information
            4.) The actual information
            */

            //returns promise
            try{
                await fsPromise.appendFile(this.logFile,this.fullMessage)
            }
            catch(e){
                //will console log the error for now
                console.log(e);
            }
            return;
        }
        //this will be done if folder does not exists

        //first create repository
        try{
            fsPromise.mkdir(this.directoryLogFile);
            fsPromise.writeFile(this.logFile,this.fullMessage)
        }catch(e){
            console.log(e)
        }
        return;

    }

    middlewareware(){

    }

    
}

const customMiddlewareLogger = (req,res,next)=>{
    //check the type of error we have
    console.log(req.method);
    next();
}

//create custom error logger and use
const customErrorMiddlewareLogger = (err,req,res,next)=>{
    console.log(err.stack);
    next();
}

module.exports = {logger,customMiddlewareLogger,customErrorMiddlewareLogger};