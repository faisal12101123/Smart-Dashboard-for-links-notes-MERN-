const mongoose = require("mongoose");
const {objectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min:3,
        max: 160,
        required: true
    },

    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },

    content: {
        type: {},
        required: true,
        min: 20,
        max: 20000
    },

    user: {
        type: String,
        default: "Admin"
    }
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);