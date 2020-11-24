const Token = require("../../models/jwt");
const bcrypt = require("bcryptjs");

function modifyUser(User) {
  return async (req, res) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
      res.json({ err: "password must not be empty" });
    }
    try {
      //validating the password using bcrypt
      let isValidPassword = bcrypt.compareSync(
        req.body.oldPassword,
        req.user.password
      );

      //responding with an err if password is not correct
      if (!isValidPassword) {
        res.json({ err: "password is incorrect" });
        return;
      }

      //updating the password
      await User.updateOne(
        { _id: req.user._id },
        { password: await bcrypt.hash(req.body.newPassword, 10) }
      );

      //deleting all the tokens on the db of this user
      await Token.deleteMany({ userId: req.user._id });

      //responding with an empty object if everything is all clean and dusted
      res.json({});
    } catch (err) {
      console.log(err);
      res.json({ err: "some fucking error" });
    }
  };
}

module.exports = modifyUser;
