const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userServices = {
  registerUser: async (req,res) => {
    try {
      if(!req.body.password) return res.status(404).send({ message: "Please provide some password" });
      if(!req.body.email) return res.status(404).send({ message: "Please provide some email" });

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const user = new User({
        email: req.body.email,
        password: hashedPassword
      })
      await user.save();
     
      // create a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ message: "User registration successfull", token });
    } catch(err) {
      console.log("Error",err);
      res.status(400).send({ message: "User registration failed"});
    }
  },

  loginUser: async (req,res) => {
    try {
      if(!req.body.password) return res.status(404).send({ message: "Email or Password Incorrect" });
      if(!req.body.email) return res.status(404).send({ message: "Email or Password Incorrect" });

      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).send({ message: 'No user found.' });
      
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ message: "Success! Login successfull", token });
    } catch(err){
      console.log("Error", err)
      res.status(400).send({ message: "Error! Login failed"});
    }
  },

  getCurrentUser: async (req,res) => {
    try {
      const user = await User.findById(req.decoded.id);
      res.status(200).send({ message: "Success! User was found", user });
    } catch(err) {
      console.log("Error", err);
      res.status(400).send({ message: "Error! Server error" })
    }
  }
}

module.exports = userServices;