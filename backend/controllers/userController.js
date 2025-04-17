/*
import User from '../models/User.js'; // Adjust path if needed

// Get all users (only selected fields like email, name, _id)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Only fetch name and email
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};
*/


const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};
