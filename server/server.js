const express = require("express");
const redis = require("ioredis");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");

dotenv.config();

PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});




