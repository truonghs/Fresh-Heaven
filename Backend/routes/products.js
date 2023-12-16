const router = require("express").Router();
const productController = require("../controllers/ProductsController");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProduct);
router.get("/search/:key", productController.searchProduct);
router.post("/add", productController.createProduct);

module.exports = router;
