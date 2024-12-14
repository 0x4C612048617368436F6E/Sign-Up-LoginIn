const rootHandler = (req,res)=>{
    if(req.accepts("html")){
        res.status(200);
        res.send("Welcome to the Root page");
    }else{
        res.status(200);
        res.send({message:"Welcome to the root page"});
    }

}

module.exports = rootHandler