const {
  create,
  update,
  destroy,
  findOne,
  getAll,
} = require("../services/PostService");

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const dataObj = {
      ...data,
      userId: req.userId,
    };
    const response = await create(dataObj);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const data = req.body;
    const formattedData = {
      data,
      postId: post_id,
    };
    const response = await update(formattedData);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const destroyPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    await destroy({ postId: post_id, userId: req.userId });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).send({ message: "Post not found" });
  }
};

const findPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const find = await findOne(post_id);
    return res.status(200).send(find);
  } catch (error) {
    return res.status(404).send({ message: "Post not found" });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await getAll(req);
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(404).send({ message: "Post not found" });
  }
};

module.exports = { createPost, updatePost, destroyPost, findPost, getPost };
