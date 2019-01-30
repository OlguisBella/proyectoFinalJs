module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define('Avatar', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  });

  Avatar.associate = (models) => {
    Avatar.hasMany(models.Jugador, {
      foreignKey: 'avatarId',
      as: 'jugadores',
    });
  };

  return Avatar;
};

/*'use strict';
module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define('Avatar', {
    title: DataTypes.STRING
  }, {});
  Avatar.associate = function(models) {
    // associations can be defined here
  };
  return Avatar;
};*/