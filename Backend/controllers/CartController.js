const Cart = require("../models/Cart");
const Products = require("../models/Products");
const User = require("../models/User");
module.exports = {
    addToCart: async (req, res) => {
        try {
            const { productId } = req.body;
            const product = await Products.findById(productId);
            console.log("Added this product to cart: ", product);
            if (!product) {
                res.status(404).json({ message: "Cart created successfully!" });
            }

            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(402).json({ message: "User not found" });
            }

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                const newCart = new Cart({
                    user: userId,
                    products: [
                        {
                            product: { ...product },
                            quantity: 1,
                        },
                    ],
                    totalPrice: parseInt(product.price),
                    totalProduct: 1,
                });

                await newCart.save();
                console.log("add to cart success");

                res.status(200).json({ message: "Cart created successfully!" });
            } else {
                var isExist;
                cart.products.forEach((item, index) => {
                    item.product._id;
                    if (item.product._id == productId) {
                        item.quantity += 1;

                        isExist = true;
                    }
                });
                cart.totalPrice = parseInt(product.price) + parseInt(cart.totalPrice);
                !isExist ? cart.products.push({ product: { ...product }, quantity: 1 }) : null;
                cart.totalProduct++;
                await cart.save();
                res.status(200).json({ message: "Product added to cart successfully!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Add to cart Error!" });
        }
    },
    getCart: async (req, res) => {
        try {
            const userId = req.params.id;

            const cart = await Cart.findOne({ user: userId });

            if (!cart || cart.length === 0) {
                return res.status(404).json({ message: "No orders found for this user" });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: "Get cart error!" });
        }
    },
    decreaseProduct: async (req, res) => {
        try {
            const { productId } = req.body;
            console.log(productId);

            const product = await Products.findById(productId);
            if (!product) {
                res.status(404).json({ message: "This product not in exist!" });
            }

            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(402).json({ message: "User not found" });
            }

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                var isExist;
                cart.products.forEach((item, index) => {
                    console.log(index, ":   ", item.product._id);
                    console.log(index, ":   ", productId);
                    console.log(index, ":   ", item.product._id == productId);
                    if (item.product._id == productId) {
                        if (item.quantity > 1) {
                            item.quantity--;
                            cart.totalPrice = parseInt(cart.totalPrice) - parseInt(product.price);
                            isExist = true;
                        } else {
                            cart.products.pop({ product: product, quantity: 1 });
                            cart.totalPrice = parseInt(cart.totalPrice) - parseInt(product.price);
                            isExist = true;
                        }
                    }
                });
                if (isExist) {
                    cart.totalProduct--;
                    await cart.save();
                    console.log("Cart decrease success!");
                    res.status(200).json({ message: "Cart decrease success!", cart: cart });
                } else {
                    res.status(500).json({ message: "This product is not in cart" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Add to cart Error!" });
        }
    },
    increaseProduct: async (req, res) => {
        try {
            const { productId } = req.body;
            console.log(productId);

            const product = await Products.findById(productId);
            if (!product) {
                res.status(404).json({ message: "This product not in exist!" });
            }

            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(402).json({ message: "User not found" });
            }

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                var isExist;
                cart.products.forEach((item, index) => {
                    if (item.product._id == productId) {
                        item.quantity++;
                        cart.totalPrice = parseInt(cart.totalPrice) + parseInt(product.price);
                        isExist = true;
                    }
                });
                if (isExist) {
                    cart.totalProduct++;
                    await cart.save();
                    console.log("Cart increase success!");
                    res.status(200).json({ message: "Cart increase success!", cart: cart });
                } else {
                    res.status(500).json({ message: "This product is not in cart" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Add to cart Error!" });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.body;
            console.log(productId);

            const product = await Products.findById(productId);
            if (!product) {
                res.status(404).json({ message: "This product not in exist!" });
            }

            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(402).json({ message: "User not found" });
            }

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                var isExist;
                cart.products.forEach((item, index) => {
                    if (item.product._id == productId) {
                        cart.totalPrice = parseInt(cart.totalPrice) - parseInt(product.price) * item.quantity;
                        isExist = true;
                        cart.totalProduct = cart.totalProduct - item.quantity;
                        cart.products.splice(index, 1);
                        console.log({ product: product, quantity: 1 });
                    }
                });
                if (isExist) {
                    await cart.save();
                    console.log("Delete product from cart success!");
                    res.status(200).json({ message: "Delete product from cart success!", cart: cart });
                } else {
                    res.status(500).json({ message: "This product is not in cart" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Delete product from cart  Error!" });
        }
    },
};