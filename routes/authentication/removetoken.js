const TokenHandler = require('./TokenHandler');

function RemoveToken(Model){
    console.log('hit')
    return async (req, res, next)=>{
        console.log('hit')
        if(req.user){
            try {
                const token = new TokenHandler(req.headers['id']);
                const data = await token.remove(req.headers['key']);
                console.log(data);
                next()
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('something went wrong')
            res.json({type: "error", messege: "You are not authenticated"})
        }
    }
}

module.exports = RemoveToken;