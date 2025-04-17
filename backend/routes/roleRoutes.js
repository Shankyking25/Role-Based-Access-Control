const express = require("express");
const { createRole, assignRole, getAllRoles } = require("../controllers/roleController");
//const { protect, authorizeRoles } = require("../middleware/authMiddleware");
// ✅ Import the middleware
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");




const router = express.Router();
//  router.post("/create", protect, authorizeRoles("Admin"), createRole);
//  router.post("/assign", protect, authorizeRoles("Admin"), assignRole);


router.post("/create", isAuthenticated, isAdmin, createRole);
router.post("/assign", isAuthenticated, isAdmin, assignRole);
router.get('/allroles', getAllRoles);

// routes/userRoutes.js

//router.put('/assign-role', assignRole);


module.exports = router;
