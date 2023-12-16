const Order = require("../models/Order");
const cartController = require("../controllers/CartController");
const Cart = require("../models/Cart");
module.exports = {
    //endpoint to store all the orders
    createOrder: async (req, res) => {
        try {
            const { userId, cartProducts, totalPrice, shippingAddress, paymentMethod, shippingMethod } = req.body;

            //create an array of product objects from the cart Items
            // const products = cartProducts.map((item) => ({
            //     id: item?._id,
            //     quantity: item.quantity,
            // }));

            //create a new Order
            const order = new Order({
                user: userId,
                products: cartProducts,
                totalPrice: totalPrice,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                shippingMethod: shippingMethod,
            });

            await order.save();
            var cart = await Cart.findOne({ user: userId });
            const newCart = new Cart({
                user: userId,
                products: [],
                totalPrice: 0,
                totalProduct: 0,
            });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                await Cart.deleteOne({ _id: cart._id });

                await newCart.save();
            }
            res.status(200).json({ message: "Order created successfully!", cart: newCart });
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
