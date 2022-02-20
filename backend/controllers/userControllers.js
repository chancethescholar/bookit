const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

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
    });
  }
  else {
    {
      res.status(400);
      throw new Error("Error occured when creating user.");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({ usernameOrEmail });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid login credentials.");
  }
});


module.exports = { registerUser, authUser }
