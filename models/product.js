const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

// here what define does is -> CREATE TABLE IF NOT EXISTS
/*
CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255) NOT NULL, `imageUrl` VARCHAR(255) NOT NULL, `price` DOUBLE PRECISION NOT NULL, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
*/
const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Product;