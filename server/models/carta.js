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
  }, {
    freezeTableName: true
  });

  return Carta;
};