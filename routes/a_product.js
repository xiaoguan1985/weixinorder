
var config = require('../config.default');
var moment = require('moment');
//var sequelize = require('../routes/weixin_sequelize');
var Sequelize = require('sequelize');
var Product = require('../models/product'),
    Category = require('../models/Category'),
    Unit = require('../models/unit'),
    Taste = require('../models/taste');

/* 显示分类 */
exports.showProduct = function(req, res){

/*
  Product.findAndCountAll({ offset:Product.pageOffset(req.query.pageNum), limit:Product.pageLimit()}).success(function(row){
    
    res.render('a_product', { 
      title: '分类管理', 
      productList : row.rows,  
      pages:{
        totalPages:Product.totalPages(row.count),
        currentPage:req.query.pageNum,
        router:'product'
      }
    });

  });


  SELECT  products.id, products.name, products.categoryid,products.unitid,products.tasteid, categories.name as cname, units.name as uname,tastes.name as tname
  FROM products left join categories on products.categoryID = categories.id left join units on products.unitid = units.id 
 left join tastes on products.tasteid = tastes.id


*/

    Product.findAndCountAll({ include: [{ all: true, nested: true }],offset:Product.pageOffset(req.query.pageNum), limit:Product.pageLimit()}).success(function(row){

        Category.findAll({where:['id > ?',0]}).then(function(categories){

            Unit.findAll().then(function(u){

                Taste.findAll().then(function(t){

                    res.render('a_product', {
                        title: '产品',
                        categories:categories,
                        units : u,
                        tastes : t,
                        products:row.rows,
                        pages:{
                            totalPages:Product.totalPages(row.count),
                            currentPage:req.query.pageNum,
                            router:'product'
                        } });

                })
            })


        });

    });




};


//修改和添加
exports.product = function(req, res){

  var id = req.body.productId,
      categoryID = req.body.categoryID,
      unitID = req.body.unitID,
      tasteID = req.body.tasteID;

  if(id != '' && id != undefined){

    Product.find(id).success(function(a){

      a.updateAttributes({
        
        name:req.body.cname

      }).success(function(){

        return res.redirect('/admin/product');
      })

    });

  }else{


      var product = Product.build({
          name : req.body.cname,
          price : req.body.price

      }),
          chainer = new Sequelize.Utils.QueryChainer;

      Product.sync();

      product.save().then(function(a){

          chainer.add(a.setCategory(categoryID))
              .add(a.setUnit(unitID))
              .add(a.setTaste(tasteID));

          chainer.run().then(function(){
              return res.redirect('/admin/product');
          })

      });

  }

};


//删除
exports.delproduct = function(req, res){

  var id = req.body.productId;



};



