const { Posts, Users, Comments } = require("../../models");

const create = async (data) => {
  const createObj = {
    title: data.title,
    content: data.content,
    user_id: data.userId,
  };
  const createPost = await Posts.create(createObj);
  return createPost;
};

const update = async (data) => {
  const updateObj = {
    title: data.title,
    content: data.content,
  };
  const findPost = await Posts.findOne({
    where: { post_id: data.postId },
  });

  if (!findPost) throw new Error(`Post ${data.postId} not found`);

  const updateComment = await Comments.update(updateObj, {
    where: { post_id: data.postId },
  });
  return updateComment;
};

const destroy = async (data) => {
  const findPost = await Posts.findOne({
    where: { post_id: data.postId },
  });
  if (!findPost) throw new Error(`Post ${data.commentId} not found`);
  if (findPost.dataValues.user_id !== data.userId)
    throw new Error("It is not possible to delete a comment");
  await Comments.destroy({
    where: { post_id: data.postId },
  });
  await Posts.destroy({
    where: { post_id: data.postId },
  });
};

const findOne = async (postId) => {
  const findPost = await Posts.findOne({
    where: { post_id: postId },
    include: [
      {
        model: Comments,
        as: "Comments",
      },
      { model: Users, as: "Users", attributes: { exclude: ["password"] } },
    ],
  });
  return findPost;
};

const getAll = async (data) => {
  const { limit, page } = data.query;
  const host = data.header("host");
  const protocol = data.protocol;
  const pageSize = Number(limit) || 10;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * pageSize;

  const dadosPaginados = await Posts.findAll({
    limit: pageSize,
    offset: offset,
    order: [["createdAt", "ASC"]],
  });

  const postsWithLinks = dadosPaginados.map((post) => {
    const baseUrl = new URL(`${protocol}://${host}/post/${post.post_id}`);
    return {
      ...post.toJSON(),
      link: baseUrl,
    };
  });

  const totalPosts = await Posts.count();
  const totalPages = Math.ceil(totalPosts / pageSize);

  const nextPage = currentPage < totalPages ? currentPage + 1 : "";
  let nextPageLink = "";
  if (nextPage) {
    const baseUrl = new URL(`${protocol}://${host}/posts`);
    baseUrl.searchParams.set("limit", pageSize);
    baseUrl.searchParams.set("page", nextPage);
    nextPageLink = baseUrl.toString();
  }

  return {
    postsWithLinks,
    count: postsWithLinks.length,
    limit,
    total: totalPosts,
    currentPage,
    totalPages: totalPages,
    nextPage: nextPage,
    nextPageLink,
  };
};

module.exports = { create, update, destroy, findOne, getAll };
