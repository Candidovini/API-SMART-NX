const { Router } = require("express");
const { createUserController } = require("../controllers/UsersController.js");
const { loginController } = require("../controllers/LoginController.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const {
  createPost,
  findPost,
  getPost,
} = require("../controllers/PostController.js");
const {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  destroyComment,
} = require("../controllers/CommentController.js");

const router = Router();

router.get("/healthz", (req, res) => {
  res.status(200).send({
    message: "Service is running",
    timestamp: new Date().getTime(),
  });
});

router.post("/session", loginController);

router.post("/user", verifyToken, createUserController);

router.post("/posts", verifyToken, createPost);

router.get("/posts/:post_id", verifyToken, findPost);

router.get("/posts", verifyToken, getPost);

router.post("/comments", verifyToken, createComment);

router.get("/comments", verifyToken, getAllComments);

router.get("/comments/:comment_id", verifyToken, getComment);

router.put("/comments/:comment_id", verifyToken, updateComment);

router.delete("/comments/:comment_id", verifyToken, destroyComment);

export default router;
