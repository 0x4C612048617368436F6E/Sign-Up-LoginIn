const allowedDomain = [undefined]

const corsOptionsObject = {
    origin:(origin,callback)=>{
        if(allowedDomain.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus:200
}

module.exports = {corsOptionsObject};