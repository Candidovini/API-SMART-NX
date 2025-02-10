const {
  create,
  update,
  destroy,
  findAll,
  findOne,
} = require("../services/CommentService");
const { FormatedResponse } = require("../helpers/FormattedResponse");

const createComment = async (req, res) => {
  try {
    const data = req.body;

    const formattedData = {
      postId: data.post_id,
      userId: req.userId,
      content: data.comment_content,
    };
    await create(formattedData);
    return res
      .status(201)
      .send(FormatedResponse.true("Comment created successfully"));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
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
    await update(formattedData);
    return res
      .status(200)
      .send(FormatedResponse.true("Comment updated successfully"));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

const destroyComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    await destroy({ commentId: comment_id, userId: req.userId });
    return res.status(204).send(FormatedResponse.true());
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

const getComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await findOne(comment_id);
    return res
      .status(200)
      .send(FormatedResponse.true("Comment found successfully", comment));
  } catch (error) {
    return res.status(404).send(FormatedResponse.false(error.message));
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await findAll(req);
    return res
      .status(200)
      .send(FormatedResponse.true("Comments found successfully", comments));
  } catch (error) {
    return res.status(404).send(FormatedResponse.false(error.message));
  }
};

module.exports = {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  destroyComment,
};
