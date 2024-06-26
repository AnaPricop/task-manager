const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");
const boardRoutes = require("./routes/api/boards");
const taskRoutes = require("./routes/api/tasks");

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 8001;
// const userRoutes = require("./routes/api/users");
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
// app.use(userRoutes);
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
