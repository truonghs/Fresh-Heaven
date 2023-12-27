const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.regitation);
router.get("/verify/:token", userController.verifyToken);
router.post("/login", userController.login);
router.get("/addresses/:userId", userController.getAddress);
router.put("/setaddresses/:userId", userController.setAddress);
router.get("/profile/:userId", userController.getUserProfile);
router.put("/forgot", userController.forgotPassword);
router.put("/getOtp", userController.giveOTP);
router.put("/reset-password", userController.resetPassword);
router.put("/updateuserinfo/:userId", userController.updateUserInfo);
module.exports = router;
