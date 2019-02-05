module.exports = (sequelize, DataTypes) => {
  const Carta = sequelize.define('Carta', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  });

  return Carta;
};