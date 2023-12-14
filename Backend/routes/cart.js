const router = require("express").Router();
const cartController = require("../controllers/CartController");

router.post("/addcart/:id", cartController.addToCart);
router.get("/getcart/:id", cartController.getCart);
router.post("/decreasecart/:id", cartController.decreaseProduct);
router.post("/increasecart/:id", cartController.increaseProduct);
router.post("/deletecart/:id", cartController.deleteProduct);

module.exports = router;
