const Sequelize  = require("sequelize");
const Connection = require("../Schema/connection");

const casaModel = Connection.define('casa', {
    user_id:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Preco: {
      type: Sequelize.STRING,
      allowNull: true
    },
    imagePath:{
      type: Sequelize.STRING,
      allowNull: true
  },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    whatsapp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    TypeHouse:{
      type: Sequelize.STRING,
      allowNull: true
  }
});

casaModel.sync({force: false}).then(() => {});
module.exports = casaModel;