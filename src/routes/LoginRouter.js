const { Router } = require("express");
const { loginController } = require("../controllers/LoginController.js");

const router = Router();

router.post("/", loginController);

module.exports = router;
