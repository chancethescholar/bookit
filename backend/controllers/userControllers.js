const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin, pic} = req.body;

  const usernameExists = await User.findOne({username});
  const emailExists = await User.findOne({email});

  if(usernameExists) {
    res.status(400);
    throw new Error("Username taken. Please choose a new one");
  }

  if(emailExists) {
    res.status(400);
    throw new Error("Email already in use. Please login or choose a different email.");
  }

  const user = await User.create({
    username, email, password, pic,
  })

  if(user)
  {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });

    //use nodemailer to send email to user on creation of account
        /*let transporter = nodemailer.createTransport({
          service: "smtp-mail.outlook.com",
          secureConnection: false, // TLS requires secureConnection to be false
          port: 587, // port for secure SMTP
          tls: {
             ciphers:'SSLv3'
          },
          auth: {
            user: "bookit-no-reply@outlook.com",
            pass: "Pinkperson8"
          }
        });

        var mailOptions = {
            from: ' "bookit " bookit-no-reply@outlook.com', //sender address
            to: user.email, //This can also contain an array of emails
            subject: 'Thank you for registering with bookit',
            //text
            html: `<b style="font-size: 20pt">Welcome to bokit ${user.username}!</b><br><p>You are on your way to exploring new reads.</p>` // html body
        };

        //send mail with defined transport object
        await transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent ' + info.response);
        });*/
      }

      else {
        res.status(400);
        throw new Error("Error occured when creating user.");
      }
  });


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const username = req.body.email;

  let user = await User.findOne({ email });
  if(!user)
  {
    user = await User.findOne({ username });
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
  else {
    {
      res.status(400);
      throw new Error("Incorrect username/email or password.");
    }
  }
});


module.exports = { registerUser, authUser }
