const router = require("express").Router();
var nodemailer = require("nodemailer");
let {verifyToken} =require('../verifytoken')

router.post("/mailsend",verifyToken, async (request, response) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testnodemail04@gmail.com",
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: "testnodemail04@gmail.com",
      to: request.body.receiverMail,
      subject: request.body.subject,
      html: `<div>${request.body.content}
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
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
