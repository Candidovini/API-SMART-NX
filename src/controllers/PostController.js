const { create, findOne } = require("../services/PostService");

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
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const findPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    console.log(post_id);
    const find = await findOne(post_id);
    return res.status(200).send(find);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Post not found" });
  }
};

module.exports = { createPost, findPost };
