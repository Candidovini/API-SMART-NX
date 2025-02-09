const { Posts } = require("../../models");

const create = async (data) => {
  console.log(data);
  const createPost = await Posts.create(data);
  return createPost;
};

module.exports = { create };
