'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.category = require("./category")(sequelize,Sequelize);
db.product = require("./product")(sequelize,Sequelize);
db.category.hasMany(db.product,{as:"product",foreignKey:'cate_id'});
db.product.belongsTo(db.category,{
  foreignKey:"cate_id",
  as:"cate"
})
db.categoryPost = require("./categorypost")(sequelize,Sequelize);
db.post = require("./post")(sequelize,Sequelize);
db.user = require("./user")(sequelize,Sequelize);
db.categoryPost.hasMany(db.post,{foreignKey:'cate_id'});
db.post.belongsTo(db.categoryPost,{
  foreignKey:"cate_id",
  as:"cate"
})
db.user.hasMany(db.post,{foreignKey:'user'});
db.post.belongsTo(db.user,{
  foreignKey:"user",
  as:"users"
})
module.exports = db;
