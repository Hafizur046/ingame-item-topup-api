const sendMail = require("./sendMail.js");

//generate random Number
function genRandomNumber(n) {
  let randomText = "";
  let charactersString = "1234567890";
  let characters = charactersString.split("");
  const pick = () => {
    let l = characters.length;
    return Math.round(Math.random() * l);
  };
  for (let i = 0; i < n; i++) {
    randomText += characters[pick()];
  }
  return Number(randomText);
}

function SendConfirmation(User) {
  async function DistroyCode(Id) {
    try {
      User.findByIdAndUpdate(Id, { tempCode: false });
    } catch (error) {
      console.log(error);
    }
  }
  return async (req, res, next) => {
    if (req.user) {
      try {
        const tempCode = genRandomNumber(5);
        console.log("Temp Code:", tempCode);
        req.user = await User.findById(req.user._id);
        sendMail(req.body.email, String(tempCode), "Confirmation Email");
        await User.findByIdAndUpdate(req.user._id, {
          tempCode: tempCode,
        });
        //setTimeout(DistroyCode, 10*60*60, req.user._id)
        next();
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send("You are not authenticated");
    }
  };
}

module.exports = SendConfirmation;

