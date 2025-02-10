const {
  create,
  update,
  destroy,
  findOne,
  getAll,
} = require("../services/PostService");
const { FormatedResponse } = require("../helpers/FormattedResponse");

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const dataObj = {
      ...data,
      userId: req.userId,
    };
    await create(dataObj);
    return res.status(201).send(FormatedResponse.true('Post created successfully'));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
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
    await update(formattedData);
    return res.status(200).send(FormatedResponse.true('Post updated successfully'));
  } catch (error) {
    return res.status(404).send(FormatedResponse.false(error.message));
  }
};

const destroyPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    await destroy({ postId: post_id, userId: req.userId });
    return res.status(204).send(FormatedResponse.true());
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

const findPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const find = await findOne(post_id);
    return res.status(200).send(FormatedResponse.true('Post found successfully', find));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await getAll(req);
    return res.status(200).send(FormatedResponse.true('Post found successfully', posts));
  } catch (error) {
    return res.status(400).send(FormatedResponse.false(error.message));
  }
};

module.exports = { createPost, updatePost, destroyPost, findPost, getPost };
