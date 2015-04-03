
var config = require('../config.default');
var moment = require('moment');
var Order = require('../models/order');

/* 显示分类 */
exports.showOrder = function(req, res){



  res.render('a_order');

};


//修改和添加
exports.order = function(req, res){

  var id = req.body.orderId;

  if(id != '' && id != undefined){

    Order.find(id).success(function(a){

      a.updateAttributes({
        
        name:req.body.cname

      }).success(function(){

        return res.redirect('/admin/order');
      })

    });

  }else{


    var order = Order.build({
      name : req.body.cname
    });

    Order.sync();

    order.save()
    .then(function(err){

      if(err){
        console.log("返回的信息：" + JSON.stringify(err));
      }

      return res.redirect('/admin/order');
    });

  }


};


//删除
exports.delorder = function(req, res){

  var id = req.body.orderId;

};



