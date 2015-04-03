
var config = require('../config.default');
var moment = require('moment');
var Category = require('../models/category');


/* 显示分类 */
exports.showCategory = function(req, res){


  Category.findAndCountAll({ offset:Category.pageOffset(req.query.pageNum), limit:Category.pageLimit()}).then(function(row){
    
    res.render('a_category', { 
      title: '分类管理', 
      categoryList : row.rows,  
      pages:{
        totalPages:Category.totalPages(row.count),
        currentPage:req.query.pageNum,
        router:'categories'
      }
    });

  });

};


//修改和添加
exports.category = function(req, res){

  var id = req.body.categoryId;

  if(id != '' && id != undefined){

    Category.find(id).success(function(a){

      a.updateAttributes({
        
        name:req.body.cname

      }).success(function(){

        return res.redirect('/admin/category');
      })

    });

  }else{


    var category = Category.build({
      name : req.body.cname
    });

    Category.sync();

    category.save()
    .then(function(err){

      if(err){
        console.log("返回的信息：" + JSON.stringify(err));
      }

      res.redirect('/admin/category');
    });

  }


};


//删除
exports.delcategory = function(req, res){

  var id = req.body.categoryId;



};



