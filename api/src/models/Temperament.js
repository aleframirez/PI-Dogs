const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    ID: {
      type: DataTypes.UUID(DataTypes.TEXT),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
  },{
    timestamps: false
  });
};
