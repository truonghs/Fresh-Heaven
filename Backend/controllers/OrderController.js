const Order = require("../models/Order");
const cartController = require("../controllers/CartController");
const Cart = require("../models/Cart");
module.exports = {
    //endpoint to store all the orders
    createOrder: async (req, res) => {
        try {
            const { userId, cartProducts, totalPrice, shippingAddress, paymentMethod, shippingMethod, shippingFee } = req.body;

            //create an array of product objects from the cart Items
            // const products = cartProducts.map((item) => ({
            //     id: item?._id,
            //     quantity: item.quantity,
            // }));
            console.log(req.body);
            //create a new Order
            var order = new Order({
                user: userId,
                products: cartProducts,
                totalPrice: totalPrice,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                shippingMethod: shippingMethod,
                shippingFee: shippingFee,
                totalProduct: 0,
            });
            const cart = await Cart.findOne({ user: userId });
            var newCart = [...cart.products];
            console.log(cart);
            var deleteAmount = 0;
            var deleteIndex = 0;
            newCart.forEach((cartItem, cartIndex) => {
                // console.log("cartItem id: ", cartItem.productId);
                order.products.forEach((orderItem, orderIndex) => {
                    // console.log("orderItem id: ", orderItem.productId);

                    if (cartItem.productId.equals(orderItem.productId) && cartItem.packing == orderItem.packing) {
                        // console.log("1");
                        // console.log("deleteItem: ", cart.products[cartIndex - deleteIndex].productId);
                        cart.products.splice(cartIndex - deleteIndex, 1);
                        deleteAmount += parseInt(cartItem.quantity);
                        deleteIndex++;
                    }
                });
            });
            order.totalProduct = deleteAmount;

            await order.save();

            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                await cart.save();
            }
            res.status(200).json({ message: "Order created successfully!", cart: cart, deleteAmount: deleteAmount });
        } catch (error) {
            console.log("error creating orders", error);
            res.status(500).json({ message: "Error creating orders" });
        }
    },
    getOrder: async (req, res) => {
        try {
            const userId = req.params.userId;

            const orders = await Order.find({ user: userId }).populate("user");

            // if (!orders || orders.length === 0) {
            //     return res.status(200).json({ message: "No orders found for this user" });
            // }

            res.status(200).json({ orders });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },
};
