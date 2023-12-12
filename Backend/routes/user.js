const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.regitation);
router.get("/verify/:token", userController.verifyToken);
router.post("/login", userController.login);
router.get("/addresses/:userId", userController.getAddress);
router.post("/addresses", userController.setAddress);
router.get("/profile/:userId", userController.getUserProfile);

module.exports = router;
