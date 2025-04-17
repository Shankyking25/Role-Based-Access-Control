/*
const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middleware/authMiddleware');

// ✅ Correct way to define PUT route with a function handler
router.put('/assign-role/:userId', isAdmin, assignRoleToUser);


module.exports = router;
*/

const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/allUser", getAllUsers); // ✅ this will work on /api/users/allUser

module.exports = router;