const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      //vida hp
      type: DataTypes.STRING,
    },
    attack: {
      //fuerza  attack
      type: DataTypes.STRING,
    },
    defense: {
      //defensa
      type: DataTypes.STRING,
      allowNull: true,
    },
    speed: {
      //velocidad
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      //altura
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      //peso
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      //imagen
      type: DataTypes.STRING,
    },
    inDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
