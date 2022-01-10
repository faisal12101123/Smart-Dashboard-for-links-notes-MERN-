const mongoose = require("mongoose");
const {objectId} = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 100,
        required: true
    },

    address: {
        type: String,
        required: true,
        min: 5,
        max: 200
    },

    user: {
        type: String,
        default: "Admin"
    }

}, {timestamps: true});

module.exports = mongoose.model("AddressPost", addressSchema);