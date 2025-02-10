const {
  create,
  update,
  destroy,
  findAll,
  findOne,
} = require("../services/CommentService");

const createComment = async (req, res) => {
  try {
    const data = req.body;

    const formattedData = {
      postId: data.post_id,
      userId: req.userId,
      content: data.comment_content,
    };
    const response = await create(formattedData);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const data = req.body;
    const formattedData = {
      commentId: comment_id,
      userId: req.userId,
      content: data.comment_content,
    };
    const response = await update(formattedData);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const destroyComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    await destroy({ commentId: comment_id, userId: req.userId });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).send({ message: "Comments not found" });
  }
};

const getComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const posts = await findOne(comment_id);
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(404).send({ message: "Comments not found" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const posts = await findAll(req);
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(404).send({ message: "Comments not found" });
  }
};

module.exports = {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  destroyComment,
};
