const { Posts, Users, Comments } = require("../../models");

const create = async (data) => {
  const createObj = {
    post_id: data.postId,
    user_id: data.userId,
    comment_content: data.content,
  };
  const createComment = await Comments.create(createObj);
  return createComment;
};

const update = async (data) => {
  const findComment = await Comments.findOne({
    where: { comment_id: data.commentId },
  });

  if (!findComment) throw new Error(`Comment ${data.commentId} not found`);

  const updateComment = await Comments.update(
    { comment_content: data.content },
    { where: { comment_id: data.commentId } }
  );
  return updateComment;
};

const destroy = async (data) => {
  const findComment = await Comments.findOne({
    where: { comment_id: data.commentId },
  });
  if (!findComment) throw new Error(`Comment ${data.commentId} not found`);
  if (findComment.dataValues.user_id !== data.userId)
    throw new Error("It is not possible to delete a comment");
  await Comments.destroy({
    where: { comment_id: data.commentId },
  });
};

const findOne = async (commentId) => {
  const findComments = await Comments.findOne({
    where: { comment_id: commentId },
    include: [
      {
        model: Posts,
        as: "Posts",
        attributes: { exclude: ["post_id"] },
      },
      { model: Users, as: "Users", attributes: { exclude: ["password"] } },
    ],
  });
  return findComments;
};

const findAll = async (data) => {
  const { limit, page } = data.query;
  const host = data.header("host");
  const protocol = data.protocol;
  const pageSize = Number(limit) || 10;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * pageSize;

  const dadosPaginados = await Comments.findAll({
    limit: pageSize,
    offset: offset,
    order: [["createdAt", "ASC"]],
  });

  const postsWithLinks = dadosPaginados.map((post) => {
    const baseUrl = new URL(`${protocol}://${host}/comments/${post.post_id}`);
    return {
      ...post.toJSON(),
      link: baseUrl,
    };
  });

  const totalPosts = await Comments.count();
  const totalPages = Math.ceil(totalPosts / pageSize);

  const nextPage = currentPage < totalPages ? currentPage + 1 : "";
  let nextPageLink = "";
  if (nextPage) {
    const baseUrl = new URL(`${protocol}://${host}/comments`);
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

module.exports = { create, findAll, findOne, update, destroy };
