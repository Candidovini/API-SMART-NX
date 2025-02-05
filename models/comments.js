module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'post_id', 
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id', 
      }
    },
    comment_content: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true, 
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'Users',
    });
  };
  Comments.associate = (models) => {
    Comments.belongsTo(models.Posts, {
      foreignKey: 'post_id',
      as: 'Posts',
    });
  };
  return Comments;
};
