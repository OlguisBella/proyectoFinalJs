module.exports = (sequelize, DataTypes) => {
  const Jugador = sequelize.define('Jugador', {
    puntaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  });

  Jugador.associate = (models) => {
    Jugador.belongsTo(models.Avatar, {
      foreignKey: 'avatarId',
      onDelete: 'CASCADE',
    });
  };

  return Jugador;
};


/*'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jugador = sequelize.define('Jugador', {
    title: DataTypes.STRING
  }, {});
  Jugador.associate = function(models) {
    // associations can be defined here
  };
  return Jugador;
};*/