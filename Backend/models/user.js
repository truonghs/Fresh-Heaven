const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avt: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    addresses: [
        {
            name: String,
            phoneNumber: String,
            houseNumber: String,
            detail: String,
            city: String,
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("User", userSchema);
