const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [
        {
            product: {
                type: Object,
                ref: "Product",
                required: true,
            },
            packing: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
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
});

module.exports = mongoose.model("Order", orderSchema);
