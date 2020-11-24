const TokenHandler = require("./TokenHandler.js");

function Authenticate(Model) {
  return async (req, res, next) => {
    try {
      //getting id and key from the headers
      let id = req.headers["id"];
      let key = req.headers["key"];

      //if theres no id or key then do nothing and return;
      if (!id || !key) {
        next();
        return;
      }

      //create a new instance of TokenHandler which you effing guesed it handles token
      let userToken = new TokenHandler(id);

      //the TokenHandler.verify() method will return errors if they occured or undefined
      let error = await userToken.verify(key);
      if (error) {
        res.json({ err: "something went wrong with authentication" });
        return;
      }

      //querring for the user using the userId from the TokenHandler instance.
      //the userId gets generated when TokenHandler.verify() method gets called
      let user = await Model.findById(userToken.userId);

      //if theres a valid user than req.isValidUser is set to true and req.user is set to the user
      if (user) {
        req.isValidUser = true;
        req.user = user;
      }

      next();
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Authenticate;
