const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
    //endpoint to store all the orders
    createOrder: async (req, res) => {
        try {
            const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

            //create an array of product objects from the cart Items
            const products = cartItems.map((item) => ({
                id: item?.id,
                quantity: item.quantity,
            }));

            //create a new Order
            const order = new Order({
                user: userId,
                products: products,
                totalPrice: totalPrice,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
            });

            await order.save();

            res.status(200).json({ message: "Order created successfully!" });
        } catch (error) {
            console.log("error creating orders", error);
            res.status(500).json({ message: "Error creating orders" });
        }
    },
    getOrder: async (req, res) => {
        try {
            const userId = req.params.userId;

            const orders = await Order.find({ user: userId }).populate("user");

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found for this user" });
            }

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },
};
