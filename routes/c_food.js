
var config = require('../config.default');


/* 微信消息 */
exports.showOrder = function(req, res){
  
  res.render('c_order', { title: '' });
};


exports.order = function(req, res){

  res.render('c_orderlist', { title: '' });

};



