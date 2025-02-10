const { Router } = require("express");
const { verifyToken } = require("../middlewares/authMiddleware.js");

const {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  destroyComment,
} = require("../controllers/CommentController.js");

const router = Router();

router.post("/", verifyToken, createComment);

router.put("/:comment_id", verifyToken, updateComment);

router.delete("/:comment_id", verifyToken, destroyComment);

router.get("/", verifyToken, getAllComments);

router.get("/:comment_id", verifyToken, getComment);

module.exports = router;
