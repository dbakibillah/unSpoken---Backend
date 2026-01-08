
const express = require("express");
const router = express.Router();
const { getAllUsers,createUser,getUserByEmail, updateUserByEmail,deleteUser} = require("../controllers/userController");
const VerifyToken=require("../middleware/verifyToken"); 



// GET all users
router.get("/all",getAllUsers);

// GET a single user by ID
//router.get("byEmail/:email", getUserByEmail);
router.get("/byEmail/:email", getUserByEmail);

// POST create new user
router.post("/create", createUser);

// PUT update a user by ID
router.put("/update/:email", updateUserByEmail);

// DELETE a user by ID
router.delete("/delete/:email", deleteUser);

module.exports = router;

