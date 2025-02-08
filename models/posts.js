module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id', 
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true, 
      unique: true, 
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'Users',
    });
  };

  Posts.associate = (models) => {
    Posts.hasMany(models.Posts, {
      foreignKey: 'posts_id',
      as: 'Posts',
    });
  };
  return Posts;
};
