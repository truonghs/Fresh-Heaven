const router = require("express").Router();
const orderController = require("../controllers/OrderController");

router.post("/orders", orderController.createOrder);
router.get("/orders/:userId", orderController.getOrder);

module.exports = router;
