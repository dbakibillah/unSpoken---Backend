const express = require("express");
const router = express.Router();
const VerifyToken=require("../middleware/verifyToken"); 
const { getAllForums } = require("../controllers/forumController");
// GET all forums
router.get("/all", getAllForums);

module.exports = router;
