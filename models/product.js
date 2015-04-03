var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');
var Category = require('./category');
var Unit = require('./unit');
var Taste = require('./taste');

//var db = require('../routes/weixin_sqlite3');

//var redis = require('../routes/weixin_redis');


/*
taste  :  口味
*/
var Product = sequelize.define('Product',{
  name:{
    type:Sequelize.STRING,
    validate:{}
  },
  price:{type:Sequelize.DECIMAL,validate:{}},
  icon:{type:Sequelize.STRING}
},{


  classMethods:{

    
  }//end classMethods

});



Product.belongsTo(Category);
Product.belongsTo(Unit);
Product.belongsTo(Taste);


module.exports = Product;