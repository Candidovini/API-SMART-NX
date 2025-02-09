const { Posts, Users, Comments } = require("../../models");

const create = async (data) => {
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

module.exports = { create, findOne, getAll };
