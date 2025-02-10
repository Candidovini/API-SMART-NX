const { Router } = require("express");
const { createUserController } = require("../controllers/UsersController.js");

const router = Router();

router.post("/", createUserController);

module.exports = router;