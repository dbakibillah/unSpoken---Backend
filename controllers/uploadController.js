const path = require("path");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { client } = require("../db");

const filesCollection = client.db("newProject").collection("files");

async function uploadSingleFile(req, res) {
    try {
        console.log(req.query.email); 
        const userId = req.query.userId;
        const email = req.query.email;

        if (!userId || !email) {
            // CLEANUP uploaded file
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: "userId and email required" });
        }

        const userFolder = path.join("uploads", userId);
        fs.mkdirSync(userFolder, { recursive: true });

        const newPath = path.join(userFolder, req.file.filename);
        fs.renameSync(req.file.path, newPath);

        await filesCollection.insertOne({
            userId,
            email,
            originalName: req.file.originalname,
            storedName: req.file.filename,
            path: newPath,
            uploadedAt: new Date()
        });

        res.status(201).json({ message: "File uploaded successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function getFileById(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid file ID" });
        }

        const file = await filesCollection.findOne({ _id: new ObjectId(id) });
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Send the actual file
        res.sendFile(path.resolve(file.path));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// ----------------- GET ALL FILES BY EMAIL -----------------
async function getAllFilesByEmail(req, res) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const files = await filesCollection.find({ email }).toArray();

        if (!files.length) {
            return res.status(404).json({ message: "No files found for this email" });
        }

        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function searchAndSortFiles(req, res) {
    try {
        const { email, name, sortBy, order } = req.query;

        // Build filter object
        const filter = {};
        if (email) filter.email = email;
        if (name) filter.originalName = { $regex: name, $options: "i" }; // case-insensitive search

        // Build sort object
        const sort = {};
        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        } else {
            sort.uploadedAt = -1; // default: newest first
        }

        const files = await filesCollection.find(filter).sort(sort).toArray();

        if (!files.length) {
            return res.status(404).json({ message: "No files found" });
        }

        res.json(files);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { uploadSingleFile,getAllFilesByEmail,getFileById ,searchAndSortFiles};
