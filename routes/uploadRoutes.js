const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { uploadSingleFile,getAllFilesByEmail,getFileById,searchAndSortFiles} = require("../controllers/uploadController");

// Single file upload
router.post("/upload", upload.single("file"), uploadSingleFile);

// Multiple file upload
//router.post("/upload/multiple", upload.array("files", 10), uploadMultipleFiles);

// GET file by fileId
router.get("/byId/:id", getFileById);

// GET all files by email
router.get("/byEmail", getAllFilesByEmail); // example: /api/files?email=mehedi@gmail.com


// Search & Sort files
router.get("/search", searchAndSortFiles);


module.exports = router;
