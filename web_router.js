var express = require('express');


var index = require('./routes/index');
var customer = require('./routes/c_order');
var category = require('./routes/a_category');
var unit = require('./routes/a_unit');
var taste = require('./routes/a_taste');
var order = require('./routes/a_order');
var product = require('./routes/a_product');
var person = require('./routes/a_person');

var router = express.Router();

//微信验证
router.get('/', index.index);
router.get('/weixin', index.checkSignature);
router.post('/weixin', index.loopMsg);

//用户点餐页面
router.get('/customer/order', customer.orderFirstView);
router.get('/customer/orders', customer.showOrder);
router.get('/customer/orders1', customer.showOrder1);

router.get('/customer/category/:id', customer.showOrder);
router.get('/customer/orderOK', customer.order);


//类别管理
router.get('/admin/category', category.showCategory);

router.post('/admin/category/add', category.category);
router.get('/admin/category/delete', category.delcategory);



//单位管理
router.get('/admin/unit', unit.showUnit);
router.post('/admin/unit/add', unit.unit);
router.get('/admin/unit/delete', unit.delunit);

//口味管理
router.get('/admin/taste', taste.showTaste);
router.post('/admin/taste/add', taste.taste);
router.get('/admin/taste/delete', taste.deltaste);


//订单管理
router.get('/admin/order', order.showOrder);
router.post('/admin/order/add', order.order);
router.get('/admin/order/delete', order.delorder);


//产品管理
router.get('/admin/product', product.showProduct);
router.post('/admin/product/add', product.product);
router.get('/admin/product/delete', product.delproduct);


//用户管理
router.get('/admin/person', person.showPerson);
router.post('/admin/person/add', person.person);
router.get('/admin/person/delete', person.delperson);



module.exports = router;

