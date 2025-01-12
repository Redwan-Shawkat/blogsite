/** @format */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
connectDB(); //Connect to MongoDB

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
