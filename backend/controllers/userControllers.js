const User = require('../models/userModel');
const Recommendation = require('../models/recommendationModel');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;

  const { username, email, password, confirmPassword, isAdmin, pic } = req.body;

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

  if(password != confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match.");
  }

  if(password.length < 8)
  {
    res.status(400);
    throw new Error("Password must be at least 8 characters.");
  }

  for(let i = 0; i < password.length; i++)
  {
    if(isUpperCase(password.charAt(i)))
    {
      hasUpperCase = true;
    }
    if(isLowerCase(password.charAt(i)))
    {
      hasLowerCase = true;
    }
    if(password.charAt(i) >= '0' && password.charAt(i) <= '9')
    {
      hasNumber = true;
    }
  }

  if(!hasUpperCase)
  {
    res.status(400);
    throw new Error("Password must contain at least one uppercase letter.");
  }

  if(!hasLowerCase)
  {
    res.status(400);
    throw new Error("Password must contain at least one lowercase letter.");
  }

  if(!hasNumber)
  {
    res.status(400);
    throw new Error("Password must contain at least one number.");
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
      username: user.username,
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

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const userWithName = await User.findOne({ username: req.body.username });
  if(userWithName && user.username !== req.body.username) {
    res.status(401);
    throw new Error("Usrername already taken. Please try a different one.")
  }

  const userWithEmail = await User.findOne({ email: req.body.email });
  if(userWithEmail && user.email !== req.body.email) {
    res.status(401);
    throw new Error("Usrername already taken. Please try a different one.")
  }

  if(user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if(req.body.password) {
      user.password = req.body.password || user.password;
    }

    if(req.body.pic){
      const recommendations = await Recommendation.find({ user: req.user._id });
      for (const recommendation of recommendations) {
        recommendation.userPic = req.body.pic;
        const updatedRecommendation = await recommendation.save();
      }
    }

    recommendations = await Recommendation.find({ user: req.user._id });
    for (const recommendation of recommendations) {
      recommendation.userName = req.body.username;
      const updatedRecommendation = await recommendation.save();
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    })
  }

  else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserPic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user);
  let userPic;

  if (user) {
    userPic = user.pic;
  }

  else {
    res.status(404).json({ message: "User picture not found." });
  }

  res.json({ userPic: userPic });
})

function isUpperCase(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

function isLowerCase(str) {
    return (/[a-z]/.test(str));
}

module.exports = { registerUser, authUser, updateUserProfile, getUserPic }
