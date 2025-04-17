const Admin = require("../models/Admin");

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ role: "Admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { name, email, role } = admin;
    res.status(200).json({ name, email, role });
  } catch (error) {
    res.status(500).json({ error: "Error fetching admin" });
  }
};
