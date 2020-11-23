const Token = require("../../models/jwt");
const bcrypt = require("bcryptjs");

function modifyUser(User) {
  return async (req, res) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
      res.json({ err: "password must not be empty" });
    }
    try {
      let validPassword = bcrypt.compareSync(
        req.body.oldPassword,
        req.user.password
      );
      if (validPassword) {
        await User.updateOne(
          { _id: req.user._id },
          { password: await bcrypt.hash(req.body.newPassword, 10) }
        );
        await Token.deleteMany({ userId: req.user._id });
        res.json({});
      } else {
        res.json({ err: "password is incorrect" });
      }
    } catch (err) {
      console.log(err);
      res.json({ err: "some fucking error" });
    }
  };
}

module.exports = modifyUser;
