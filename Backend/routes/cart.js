const router = require("express").Router();
const cartController = require("../controllers/CartController");

router.post("/addcart/:id", cartController.addToCart);
router.get("/getcart/:id", cartController.getCart);
router.put("/update-cart/:id", cartController.updateCart);

module.exports = router;
