

/* 
功能： 微信已经配置路径志向该路由
点餐
餐品列表
*/


var config = require('../config.default');

var Category = require('../models/category'),
    Order = require('../models/order'),
    OrderItem = require('../models/orderItem'),
    Product = require('../models/product');


/* 显示订单信息第一步选择视图 */
exports.orderFirstView = function(req, res){
  
  res.render('c_order', { title: '' });
};


exports.showOrder = function(req, res){

    if(req.params.id == undefined){
        req.params.id = 1;
    }

    Category.findAll().then(function(c){

        Product.findAll({where:['categoryID = ?',req.params.id]}).then(function(p){

            res.render('c_orderlist_boot', { title: '', product:p, category : c });
        })

    })

};

exports.showOrder1 = function(req, res){

    if(req.params.id == undefined){
        req.params.id = 1;
    }

    Category.findAll().then(function(c){

        Product.findAll({where:['categoryID = ?',req.params.id]}).then(function(p){

            res.render('c_orderlist', { title: '', product:p, category : c });
        })

    })

};


/*
用户下单
 */
exports.order = function(req, res){

    //Order.sync();
    //OrderItem.sync();


    var id = req.body.orderId;

    var amount = req.params.amount,
        address = req.params.address,
        telephone = req.params.telephone,
        sendTime = req.params.sendTime,
        description = req.params.description;

    if(id != '' && id != undefined){

        Order.find(id).success(function(a){

            a.updateAttributes({

                name:req.body.cname

            }).success(function(){

                return res.redirect('/admin/order');
            })

        });

    }else{

        Product.find(req.params.productID).then(function(p){

            var totalPrice = p.price * amount;

            var chainer = new Sequelize.Utils.QueryChainer
                , order  = Order.build({
                    uName: 'Luke' ,
                    address: address ,
                    telephone : telephone,
                    orderTime : sendTime,
                    sendTime : sendTime,
                    totalPrice : totalPrice,
                    description : description
                })
                , orderItem  = OrderItem.build({
                    amount : amount,
                    price : p.price
                });

            chainer.add(order.save())
                .add(orderItem.save());

            chainer.run().then(function(){

                orderItem.setProduct(p.id).then(function(){

                });

            });

        })

        order.save()
            .then(function(){

                res.redirect('/admin/order');
            });

    }
    //res.render('c_orderlist', { title: '' });

};



