var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');



var Unit = sequelize.define('Unit',{
  name:{
    type:Sequelize.STRING,
    validate:{}
  }
});

module.exports = Unit;
