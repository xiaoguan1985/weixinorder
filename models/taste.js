var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');


var Taste = sequelize.define('Taste',{
  name:{
    type:Sequelize.STRING,
    validate:{}
  }
});

module.exports = Taste;