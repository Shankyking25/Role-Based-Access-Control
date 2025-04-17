const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};




/*
exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Access denied. No token." });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role }
      next();
    } catch (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }
    next();
  };
*/

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded = { id, role }
      next();
    } catch (err) {
      return res.status(403).json({ msg: "Invalid or expired token" });
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    try {
        console.log("----- authMiddle------")
         console.log(req.user && req.user.role)
         console.log(req.user && req.user.role === "Admin")
      if (req.user && req.user.role === "Admin") {
        return next();
      } else {
        return res.status(403).json({ msg: "Access denied. Admins only." });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Admin check failed" });
    }
  };



