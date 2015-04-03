/**
 * Created by apple on 15/3/9.
 */

var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');


var Product = require('./product');

//var Category = require('./category');
//var Unit = require('./unit');
//var Taste = require('./taste');


var OrderItem = sequelize.define('OrderItem',{

    price:{type:Sequelize.DECIMAL,validate:{}},
    amount:{type:Sequelize.INTEGER,validate:{}}

},{


    classMethods:{


    }//end classMethods

});


OrderItem.belongsTo(Product);


module.exports = OrderItem;