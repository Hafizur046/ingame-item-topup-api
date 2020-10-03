//Email verification middleware
function Verify(User){
    class E{
        constructor(){
            this.type = 'error'
            this.errors = [];
        }
        add(err){
            this.errors.push(err);
        }
    }
    return (req, res, next)=>{
        const e = new E();
        if(req.user){
            if(req.user.emailConfirmed){
                res.send('Your email is already confirmed')
                return;
            }
            if(req.user.tempCode){
                if(req.user.tempCode === Number(req.params.code)){
                    res.send('success')
                }else{
                    e.add('Your code is incorrect')
                    res.send(e)
                }
            }else{
                e.add("Your code might have expired");
                res.json(e)
            }

        }else{
            e.add('You are not authenticated');
            res.json(e);
        }
    }
}

module.exports = Verify;