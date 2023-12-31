const Cart = require("../models/Cart");
const Products = require("../models/Products");
const User = require("../models/User");

module.exports = {
    addToCart: async (req, res) => {
        try {
            const { productId, packingIndex, quantity } = req.body;
            const product = await Products.findById(productId);
            const packing = product.packing[packingIndex].unit;
            if (!product) {
                res.status(404).json({ message: "Cart created successfully!" });
            }

            const userId = req.params.id;

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                const user = await User.findById(userId);

                if (!user) {
                    return res.status(402).json({ message: "User not found" });
                }
                const newCart = new Cart({
                    user: userId,
                    products: [
                        {
                            productId: productId,
                            productTitle: product.title,
                            packing: packing,
                            quantity: parseInt(quantity),
                        },
                    ],
                });

                await newCart.save();
                console.log("add to cart success");

                res.status(200).json({ message: "Cart created successfully!", cart: cart });
            } else {
                var isExist;
                cart.products.forEach((item, index) => {
                    if (item.productId == productId && item.packing == packing) {
                        item.quantity = item.quantity + parseInt(quantity);

                        isExist = true;
                    }
                });
                !isExist
                    ? cart.products.push({
                          productId: productId,
                          productTitle: product.title,
                          packing: packing,
                          quantity: parseInt(quantity),
                      })
                    : null;
                console.log(cart);
                await cart.save();
                res.status(200).json({ message: "Product added to cart successfully!", cart: cart });
            }
        } catch (error) {
            res.status(500).json({ message: "Add to cart Error!" });
        }
    },
    getCart: async (req, res) => {
        try {
            const userId = req.params.id;

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                const newCart = new Cart({
                    user: userId,
                    products: [],
                });
                await newCart.save();
                res.status(200).json(newCart);
            } else {
                res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ message: "Get cart error!" });
        }
    },
    updateCart: async (req, res) => {
        try {
            const userId = req.params.id;
            const { newCart } = req.body;
            var cart = await Cart.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                cart.user = newCart.user;
                cart.products = newCart.products;
                console.log(cart);
                await cart.save();
                res.status(200).json({ message: "Cart delete success!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Update cart  Error!" });
        }
    },
    deleteCart: async (req, res) => {
        try {
            const userId = req.params.id;
            var cart = await Cart.findOne({ user: userId });
            if (!cart) {
                res.status(400).json({ message: "Cart not found!" });
            } else {
                Cart.remove(cart);
                res.status(200).json({ message: "Cart delete success!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Delete cart  Error!" });
        }
    },
};

// decreaseProduct: async (req, res) => {
//     try {
//         const { productId, packing, productPrice } = req.body;
//         console.log(productId);

//         const product = await Products.findById(productId);
//         if (!product) {
//             res.status(404).json({ message: "This product not in exist!" });
//         }

//         const userId = req.params.id;
//         const cart = await Cart.findOne({ user: userId });
//         if (!cart) {
//             res.status(400).json({ message: "Cart not found!" });
//         } else {
//             var isExist;
//             cart.products.forEach((item, index) => {
//                 if (item.product._id == productId && item.packing == packing) {
//                     if (item.quantity > 1) {
//                         item.quantity--;
//                         cart.totalPrice = parseInt(cart.totalPrice) - parseInt(productPrice);
//                         isExist = true;
//                     } else {
//                         cart.products.pop({ product: product, quantity: 1 });
//                         cart.totalPrice = parseInt(cart.totalPrice) - parseInt(productPrice);
//                         isExist = true;
//                     }
//                 }
//             });
//             if (isExist) {
//                 cart.totalProduct--;
//                 await cart.save();
//                 console.log("Cart decrease success!");
//                 res.status(200).json({ message: "Cart decrease success!", cart: cart });
//             } else {
//                 res.status(500).json({ message: "This product is not in cart" });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Add to cart Error!" });
//     }
// },
// increaseProduct: async (req, res) => {
//     try {
//         const { productId, packing, productPrice } = req.body;
//         console.log(productId);

//         const product = await Products.findById(productId);
//         if (!product) {
//             res.status(404).json({ message: "This product not in exist!" });
//         }

//         const userId = req.params.id;

//         const cart = await Cart.findOne({ user: userId });
//         if (!cart) {
//             res.status(400).json({ message: "Cart not found!" });
//         } else {
//             var isExist;
//             cart.products.forEach((item, index) => {
//                 if (item.product._id == productId && item.packing == packing) {
//                     item.quantity++;
//                     cart.totalPrice = parseInt(cart.totalPrice) + parseInt(productPrice);
//                     isExist = true;
//                 }
//             });
//             if (isExist) {
//                 cart.totalProduct++;
//                 await cart.save();
//                 console.log("Cart increase success!");
//                 res.status(200).json({ message: "Cart increase success!", cart: cart });
//             } else {
//                 res.status(500).json({ message: "This product is not in cart" });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Add to cart Error!" });
//     }
// },
// deleteProduct: async (req, res) => {
//     try {
//         const { productId, packing, productPrice } = req.body;

//         const product = await Products.findById(productId);
//         if (!product) {
//             res.status(404).json({ message: "This product not in exist!" });
//         }
//         const userId = req.params.id;

//         const cart = await Cart.findOne({ user: userId });
//         if (!cart) {
//             res.status(400).json({ message: "Cart not found!" });
//         } else {
//             var isExist;
//             cart.products.forEach((item, index) => {
//                 if (item.product._id == productId && item.packing == packing) {
//                     cart.totalPrice = parseInt(cart.totalPrice) - parseInt(productPrice) * item.quantity;
//                     isExist = true;
//                     cart.totalProduct = cart.totalProduct - item.quantity;
//                     cart.products.splice(index, 1);
//                     console.log({ product: product, quantity: 1 });
//                 }
//             });
//             if (isExist) {
//                 await cart.save();
//                 console.log("Delete product from cart success!");
//                 res.status(200).json({ message: "Delete product from cart success!", cart: cart });
//             } else {
//                 res.status(500).json({ message: "This product is not in cart" });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Delete product from cart  Error!" });
//     }
// },
