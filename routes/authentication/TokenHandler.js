
const Token = require('../../models/jwt.js');
const getRandomText = require('./getRandomText');
const n = 35;

class TokenHandler {
    constructor(id) {
        // id is the _id of 'Tokens' collection
        //id can be used to find and validate the token
        if(id){
            this.id = id;
            this.isValid = false;
        }
    }
    async verify(key) {
        //key is a randomly generated string of a length of 20 characters
        //key is used to validate the token
        if(this.id){
            this.response = await Token.findById(this.id);
            if(this.response){
                if(this.response.key === key){
                    this.userId = this.response.userId;
                    return ;
                }else{
                    return 'Key is incorrect';
                }
            }else{
                return;
            }
        }else{
            return 'Id is required'
        }
    }
    async getToken(userId) {
        //this functions generates a token for a given userId
        //userId is the _id of 'Users' collection
        this.key = getRandomText(n);
        let token = new Token();
        token.userId = userId;
        token.key = this.key;
        let response = await token.save();
        this.id = response._id;
        return ;
        
    }
    async remove(key){
        //This function removes the token with specifyed id and key
        // The id must be passed to the constructor function s
        if(this.id){
            let token = await Token.findById(this.id);
            if(token.key === key){
                this.response = await Token.remove({_id: this.id});
                if(this.response){
                    if(this.response.key === key){
                        this.isValid = true;
                        return;
                    }else{
                        console.log(this.response.key , ':', key)
                        return 'Key is incorrect';
                    }
                }else{
                    return;
                }
            }else{
                return new Error('Key is not correct')
            }
        }else{
            return 'Id is required'
        }
    }
}

module.exports = TokenHandler;