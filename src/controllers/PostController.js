const { create } = require("../services/PostService");

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

module.exports = { createPost };
