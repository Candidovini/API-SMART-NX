const { Router } = require("express");
const loginRouter = require("./LoginRouter");
const userRouter = require("./UserRouter");
const commentRouter = require("./CommentRouter");
const postRouter = require("./PostRouter");

const router = Router();

router.get("/healthz", (req, res) => {
  res.status(200).send({
    message: "Service is running",
    timestamp: new Date().getTime(),
  });
});

router.use("/user", userRouter);
router.use("/login", loginRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

module.exports = router;
