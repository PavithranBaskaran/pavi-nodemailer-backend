const User = require("../model/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const random = require("random-string-alphanumeric-generator");
var nodemailer = require("nodemailer");

//Register
router.post("/signup", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);
  request.body.password = hash;
  const newUser = new User({
    email: request.body.email,
    password: request.body.password,
    name: request.body.name,
  });

  try {
    const savedUser = await newUser.save();
    response.status(200).json({
      message: "User added!",
      savedUser,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

//Login
router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          process.env.SECRET
        );

        response.status(200).json({
          user,
          message: "Successfully logged in!",
          token,
        });
      } else {
        response.json({
          message: "Password Incorrect",
        });
      }
    } else {
      response.json({
        message: "User not found!",
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

router.put("/forgetpassword", async (request, response) => {
  try {
    let user = await User.findOne({ email: request.body.email });

    if (user) {
      let tempPass = random.randomAlphanumeric(8);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(tempPass, salt);

      let res = await User.findOneAndUpdate(
        { email: request.body.email },
        {
          $set: {
            password: hash,
          },
        }
      );
      if (res) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "testnodemail04@gmail.com",
            pass: process.env.pass,
          },
        });

        var mailOptions = {
          from: "testnodemail04@gmail.com",
          to: request.body.email,
          subject: "Your New Password",
          html: `<div>${tempPass}
        </div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            response.json({
              message: "Email not send",
            });
          } else {
            console.log("Email sent: " + info.response);
            response.json({
              message: "Email Send",
            });
          }
        });
      } else {
        response.status(400).json({ message: "Something went wrong" });
      }
    } else {
      response.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ error, message: "Error" });
  }
});

module.exports = router;
