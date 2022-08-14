const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controllers");

router.post("/user", userController.createUser);
router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;