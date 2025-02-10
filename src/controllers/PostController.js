const { create, findOne, getAll } = require("../services/PostService");

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const formattedData = {
      title: data.title,
      content: data.content,
      user_id: req.userId,
    };
    const response = await create(formattedData);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
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

module.exports = { createPost, findPost, getPost };
