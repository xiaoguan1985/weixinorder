
var config = require('../config.default');
var moment = require('moment');
var Taste = require('../models/taste');

/* 显示分类 */
exports.showTaste = function(req, res){


  Taste.findAndCountAll({ offset:Taste.pageOffset(req.query.pageNum), limit:Taste.pageLimit()}).success(function(row){
    
    res.render('a_taste', { 
      title: '分类管理', 
      tasteList : row.rows,  
      pages:{
        totalPages:Taste.totalPages(row.count),
        currentPage:req.query.pageNum,
        router:'taste'
      }
    });

  });


};


//修改和添加
exports.taste = function(req, res){

  var id = req.body.tasteId;

  if(id != '' && id != undefined){

    Taste.find(id).success(function(a){

      a.updateAttributes({
        
        name:req.body.cname

      }).success(function(){

        return res.redirect('/admin/taste');
      })

    });

  }else{


    var taste = Taste.build({
      name : req.body.cname
    });

    Taste.sync();

    taste.save()
    .success(function(err){

      if(err){
        console.log("返回的信息：" + JSON.stringify(err));
      }

      res.redirect('/admin/taste');
    });

  }


};


//删除
exports.deltaste = function(req, res){

  var id = req.body.tasteId;



};



