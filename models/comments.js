module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Posts",
        key: "post_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    comment_content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Comments.associate = (models) => {
    // Associação com Users
    Comments.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "Users",
    });

    // Associação com Posts
    Comments.belongsTo(models.Posts, {
      foreignKey: "post_id",
      as: "Posts", // Alias usado no modelo Posts
    });
  };
  return Comments;
};
