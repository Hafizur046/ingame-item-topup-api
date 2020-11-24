const bcrypt = require("bcryptjs");
const TokenHandler = require("./TokenHandler.js");

function isValid(user) {
  if (!user.username) {
    return false;
  }
  if (!user.fullName) {
    return false;
  }
  if (!user.email) {
    return false;
  }
  let parts = user.email.split("@");
  if (
    parts.length !== 2 ||
    parts.length !== 2 ||
    user.email.split("").length > 50
  ) {
    return false;
  }
  if (!user.phone) {
    return false;
  }
  if (user.phone.split("").length !== 11) {
    return false;
  }
  if (!user.password) {
    return false;
  }
  return true;
}

function Register(Model) {
  return async (req, res, next) => {
    if (!isValid(req.body)) {
      res.json({ err: "Provide all fields" });
      return;
    }
    try {
      //querry the user Model using the provided email and password
      let user = await Model.find({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      }).exec();

      //if any user exist by this given username or email then return;
      if (user.length !== 0) {
        res.json({ err: "email or username is taken" });
        return;
      }

      //create a new instance of User Model;
      let thisUser = new Model();

      //set all the values from req body to the instance of User
      thisUser.username = req.body.username;

      //hash the password from req.body and store it
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(req.body.password, salt);
      thisUser.password = hashedPassword;

      //continue
      thisUser.email = req.body.email;
      thisUser.phone = req.body.phone;
      thisUser.fullName = req.body.fullName;
      //this is a messy solution to a fucking problem that I made
      thisUser._id = Number(await Model.countDocuments());

      //call the save method of the new instance of User Model;
      await thisUser.save();

      //generate a token for this user and set them on response header
      //initiate
      let userToken = new TokenHandler();
      //call getToken method
      await userToken.getToken(req.user._id);
      //set id and key to response header
      res.setHeader("id", userToken.id);
      res.setHeader("key", userToken.key);

      //also send the id and key as response body
      res.json({ id: userToken.id, key: userToken.key });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = Register;
