const express = require("express");
const router = express.Router();
const VerifyToken=require("../middleware/verifyToken"); 
const { getAllForums, 
  getForumsById,
  CreateForumsById,
  UpdateForum,
  CommentForum} = require("../controllers/forumController");

  
// GET all forums
router.get("/all", getAllForums);
router.get("/get/:id",getForumsById); 
router.get("/create/:id",CreateForumsById);
 router.get("/update/:id",UpdateForum);
router.get("/comment/:id",CommentForum);



module.exports = router;


