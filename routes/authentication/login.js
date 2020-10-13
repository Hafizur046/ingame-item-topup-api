const findUser = require("./findUser");
const bcrypt = require("bcryptjs");
const TokenHandler = require("./TokenHandler.js");

//request data validator
function isValidLoginInfo(user) {
  if (user.username) {
    if (user.password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//Login middleware
function Login(Model) {
  return async (req, res, next) => {
    //check if the req.body is valid
    if (isValidLoginInfo(req.body)) {
      try {
        //search for the username recieved the req.body object
        let user = await Model.findOne({ username: req.body.username });

        //compare the given password with the stored hashed password
        let validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        //check if the password is valid
        if (validPassword) {
          //initialize the tokenHandler
          let userToken = new TokenHandler();

          //getting the token form tokenHandler
          console.log("user is:", user);
          await userToken.getToken(user._id);

          //setting the token as response header
          res.setHeader("id", userToken.id);
          res.setHeader("key", userToken.key);

          //calling the next() callback
          next();
        } else {
          res.send("Password is not valid");
        }
      } catch (error) {
        console.log(error);
        res.send("Ops something went wrong");
      }
    }
  };
}
module.exports = Login;

