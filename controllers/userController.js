const { client } = require("../db");
const { ObjectId } = require("mongodb");

// Get the users collection
const usersCollection = client.db("newProject").collection("user");

// ------------------- GET ALL USERS -------------------
async function getAllUsers(req, res) {
    try {
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ------------------- GET USER BY ID -------------------
async function getUserByEmail(req, res) {
    try {
               // console.log(req.params.email); 
        const email = req.params.email; // <-- use req.params
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// ------------------- CREATE NEW USER -------------------
async function createUser(req, res) {
    try {
        const user = req.body; // {name, email, age, etc.}
        const result = await usersCollection.insertOne(user);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ------------------- UPDATE USER -------------------
async function updateUserByEmail(req, res) {
    try {
        console.log(req.params.email); 
        console.log(req.body); 
        const email = req.params.email;
        const data = req.body;
        const result = await usersCollection.updateOne(
            { email },
            { $set: data }
        );
        if (result.matchedCount === 0)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// ------------------- DELETE USER -------------------
async function deleteUser(req, res) {
 try {
        const email = req.params.email;
        const result = await usersCollection.deleteOne({ email });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUserByEmail,
    deleteUser
};
