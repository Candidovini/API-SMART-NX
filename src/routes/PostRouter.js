const { Router } = require("express");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const {
  createPost,
  findPost,
  getPost,
  updatePost,
  destroyPost,
} = require("../controllers/PostController.js");

const router = Router();

router.post("/", verifyToken, createPost);

router.put("/:post_id", verifyToken, updatePost);

router.delete("/:post_id", verifyToken, destroyPost);

router.get("/:post_id", verifyToken, findPost);

router.get("/", verifyToken, getPost);

module.exports = router;