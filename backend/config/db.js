require('dotenv').config();
const mongoose = require("mongoose");

/* Replace <password> with your database password */
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
console.log(process.env.MONGODB_URI)
mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;