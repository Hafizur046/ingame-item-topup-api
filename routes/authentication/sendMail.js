//configuring environment variables
require("dotenv").config();

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["EMAIL"],
    pass: process.env["PASSWORD"],
  },
});

function sendMail(email, message, subject) {
  console.log("email:", email);
  console.log("text:", message);
  var mailOptions = {
    from: "sopnorajjofoundation@gmail.com",
    to: email,
    subject: subject,
    text: String(message),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMail;

