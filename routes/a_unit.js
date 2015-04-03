
var config = require('../config.default');
var moment = require('moment');
var Unit = require('../models/unit');


/* 显示分类 */
exports.showUnit = function(req, res){


  
  Unit.findAndCountAll({ offset:Unit.pageOffset(req.query.pageNum), limit:Unit.pageLimit()}).success(function(row){
    
    res.render('a_unit', { 
      title: '分类管理', 
      unitList : row.rows,  
      pages:{
        totalPages:Unit.totalPages(row.count),
        currentPage:req.query.pageNum,
        router:'unit'
      }
    });

  });



};


//修改和添加
exports.unit = function(req, res){

  var id = req.body.unitId;

  if(id != '' && id != undefined){

    Unit.find(id).success(function(a){

      a.updateAttributes({
        
        name:req.body.cname

      }).success(function(){

        return res.redirect('/admin/unit');
      })

    });

  }else{

    var unit = Unit.build({
      name : req.body.cname
    });

    Unit.sync();

    unit.save()
    .success(function(err){

      if(err){
        console.log("返回的信息：" + JSON.stringify(err));
      }

      res.redirect('/admin/unit');
    });

  }


};


//删除
exports.delunit = function(req, res){

  var id = req.body.unitId;



};



