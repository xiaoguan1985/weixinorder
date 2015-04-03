var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');

var OrderItem = require('./orderItem');

/*
uname  :  口味
*/
var Order = sequelize.define('Order',{
  uName:{
    type:Sequelize.STRING,
    validate:{}
  },
  address:{ type:Sequelize.STRING, validate:{} },
  telephone:{ type:Sequelize.STRING, validate:{} },

  orderTime:{ type:Sequelize.DATE, validate:{} },
  sendTime:{ type:Sequelize.DATE, validate:{} },

  totalPrice:{type:Sequelize.DECIMAL,validate:{}},
  description:{ type:Sequelize.STRING, validate:{} }

},{


  classMethods:{

  
  }//end classMethods

});


Order.hasMany(OrderItem);


module.exports = Order;




