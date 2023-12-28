const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalProduct: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    shippingFee: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);
