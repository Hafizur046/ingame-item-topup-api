function requiredValidation(){

    //this middleware only calls the next() if the user is valid
    return (req, res, next)=>{
        if(req.isValidUser){
            next();
        }else{
            res.send('This resource requires validation')
        }
    }
}

module.exports = requiredValidation;