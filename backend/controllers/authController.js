const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hashed });

  res.status(201).json({ msg: "User registered" });
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const loweredEmail = email.toLowerCase();
      console.log("Login email:", loweredEmail);
  
      // Try finding in Admin model first
      let user = await Admin.findOne({ email: loweredEmail });
      let role = "admin";
          console.log(user) 
      // If not admin, try finding in User model
      if (!user) {
        user = await User.findOne({ email: loweredEmail });
        role = "user";
      }
  
      console.log("User found:", user);
  
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ msg: "Wrong credentials" });
  
      const token = jwt.sign(
        { id: user._id,       
          name: user.name,
          email: user.email,
          role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  

      console.log("-------------------")
      console.log(user._id)
      console.log(user.role)

      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({
          msg: "Login successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: role,
          },
        });
  
      console.log("User logged in:", user.email);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  };  

exports.logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
};
