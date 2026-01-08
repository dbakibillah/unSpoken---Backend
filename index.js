const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./db");
const userRoutes=require('./routes/userRoutes'); 
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;



app.use("/users", userRoutes);
app.use("/file", uploadRoutes);


// Start server after DB connection
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
        process.exit(1);
    });
