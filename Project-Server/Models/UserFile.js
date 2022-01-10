const mongoose = require("mongoose");
const {objectId} = mongoose.Schema;

const userFileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        min:3,
        max: 30,
        required: true
    }
});

module.exports = mongoose.model("UserFile", userFileSchema);