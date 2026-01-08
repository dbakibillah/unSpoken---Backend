const { client } = require("../db");
const { ObjectId } = require("mongodb");

const forumsCollection = client.db("newProject").collection("forums");

// ------------------- GET ALL FORUMS -------------------
async function getAllForums(req, res) {
  try {
    const forums = await forumsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllForums,
};