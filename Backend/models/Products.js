const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        supplier: { type: String, required: true },
        packing: [
            {
                unit: { type: String, required: true }, //1Kg, 2kg, 3kg,
                price: { type: Number, required: true }, //20k, 40k, 60k
                discount: { type: Number, required: true },
            },
        ],
        rating: { type: Number, required: true },
        feedBack: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    require: true,
                },
                rating: { type: Number, required: true },
                date: { type: Date, required: true },
                content: { type: String, required: true },
            },
        ],
        imageUrl: [{ type: String, required: true }],
        category: [{ type: String, required: true }],
        description: { type: String, required: true },
        product_location: { type: String, required: true },
        isAvailable: { type: Boolean, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
