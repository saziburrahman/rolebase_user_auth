const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.DB_URI)
    console.log("Database connected");
} catch (error) {
    console.log(error);
}
