const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const routes = require("./routes/api/books");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");
const boardRoutes = require("./routes/api/boards");

app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 8001;
// const userRoutes = require("./routes/api/users");
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", routes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/boards", boardRoutes);
// app.use(userRoutes);
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
