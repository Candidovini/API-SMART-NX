const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  },{
    timestamps: false,  
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      foreignKey: 'user_id',
      as: 'Posts',
    });
  };
  return Users;
};

module.exports = Users;