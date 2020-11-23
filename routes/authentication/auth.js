//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const TokenHandler = require("./TokenHandler.js");

//Validation middleware
function Authenticate(Model) {
  return async (req, res, next) => {
    //this function checks if there is id and key in the headers and validate them and if they are valid
    //req.isValidUser is set to true
    //This function sets the req.user to the user according to the id and key
    try {
      let id = req.headers["id"];
      const Id = id;
      let key = req.headers["key"];
      const Key = key;
      if (id && key) {
        let userToken = new TokenHandler(Id);
        let error = await userToken.verify(Key);
        if (error) {
          res.send("something went wrong with authentication");
          return;
        }
        let id = userToken.userId;
        let user = await Model.findById(id);
        if (user == null) {
          req.isValidUser = false;
          next();
        } else {
          req.isValidUser = true;
          req.user = user;
          next();
        }
      } else {
        req.isValidUser = false;
        req.user = undefined;
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Authenticate;
