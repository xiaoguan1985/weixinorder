var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');


var Category = sequelize.define('Category',{
  name:{
    type:Sequelize.STRING,
    validate:{}
  }
});

module.exports = Category;
