const bcrypt = require("bcryptjs");
const TokenHandler = require("./TokenHandler.js");

//request data validator
function isValidLoginInfo(user) {
  if (!user.username) {
    return false;
  }
  if (!user.password) {
    return false;
  }
  return true;
}

function Login(Model) {
  return async (req, res) => {
    //check if the req.body is valid
    if (!isValidLoginInfo(req.body)) {
      res.json({ err: "Please Provide all the effing fields" });
      return;
    }

    try {
      //search for the username recieved the req.body object
      let user = await Model.findOne({ username: req.body.username });

      if (!user) {
        return res.json({
          err: "Please Make sure The Username or password is correct",
        });
      }

      //compare the given password with the stored hashed password
      let validPassword = bcrypt.compareSync(req.body.password, user.password);

      //check if the password is valid
      if (!validPassword) {
        res.json({
          err: "Please Make sure The Username or password is correct",
        });
        return;
      }

      //initialize the tokenHandler
      let userToken = new TokenHandler();

      //getting the token form tokenHandler
      console.log("user is:", user);
      await userToken.getToken(user._id);

      //setting the token as response header
      res.setHeader("id", userToken.id);
      res.setHeader("key", userToken.key);

      res.cookie("cookieName", "hi there fucking user", {
        maxAge: 900000,
        httpOnly: true,
      });

      //also returning the id and key in response body
      res.json({ id: userToken.id, key: userToken.key });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = Login;
