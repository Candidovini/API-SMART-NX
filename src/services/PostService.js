const { Posts, Users, Comments } = require("../../models");

const create = async (data) => {
  console.log(data);
  const createPost = await Posts.create(data);
  return createPost;
};

const findOne = async (postId) => {
  const findPost = await Posts.findOne({
    where: { post_id: postId },
    include: [
      {
        model: Comments,
        as: "Comments",
        attributes: { exclude: ["comment_id"] },
      },
      { model: Users, as: "Users", attributes: { exclude: ["password"] } },
    ],
  });
  return findPost;
};

module.exports = { create, findOne };
