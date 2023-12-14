const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
    totalProduct: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
