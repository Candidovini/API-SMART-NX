const { Router } = require("express");
const { createUserController } = require("../controllers/UsersController.js");
const { loginController } = require("../controllers/LoginController.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const { createPost } = require("../controllers/PostController.js");

const router = Router();

router.get("/healthz", (req, res) => {
  res.status(200).send({
    message: "Service is running",
    timestamp: new Date().getTime(),
  });
});

router.post("/session", loginController);

router.post("/create-user", verifyToken, createUserController);

router.post("/create-post", verifyToken, createPost);

export default router;
