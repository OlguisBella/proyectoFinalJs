'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carta = sequelize.define('Carta', {
    title: DataTypes.STRING
  }, {});
  Carta.associate = function(models) {
    // associations can be defined here
  };
  return Carta;
};