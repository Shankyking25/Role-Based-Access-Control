const Role = require("../models/Role");
const User = require("../models/User");

exports.createRole = async (req, res) => {
  const { name } = req.body;
  console.log(name)
  try {
    const role = await Role.create({ name });
    res.status(201).json({ msg: "Role created", role });
  } catch (err) {
    res.status(400).json({ msg: "Role already exists or error", err });
  }
};

exports.assignRole = async (req, res) => {
 /*
  const { userId, role } = req.body;
 
 try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Role assigned", user });
  } catch (err) {
    res.status(500).json({ msg: "Error assigning role" });
  }
*/

const { email, role } = req.body;

  try {
    const user = await User.findOneAndUpdate({ email }, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Role assigned", user });
  } catch (err) {
    res.status(500).json({ msg: "Error assigning role", error: err.message });
  }
};




// controllers/userController.js

exports.getAllUsers = async (req, res) => {
  try {
   // const users = await User.find({}, 'email'); // Only fetch email field
   const users = await User.find({}); 
   res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};



// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roles', error });
  }
};