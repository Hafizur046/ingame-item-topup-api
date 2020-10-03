function requirePrivillage(privillage){
    return function (req, res, next){
        if(req.user.privillage == privillage){
            next()
            return;
        }

        res.status(401).send();
    }
}

module.exports = requirePrivillage;