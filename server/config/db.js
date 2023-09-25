//amitsingh211199@gmail.com (Database)

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;