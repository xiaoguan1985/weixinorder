

var Sequelize = require('sequelize');
var config = require('../config.default');

var sequelize = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',
 
  // the storage engine for sqlite
  // - default ':memory:'
  storage: config.sqlitePath,

  define:{
    classMethods:{
      pageOffset:function(pageNum){

        if(isNaN(pageNum) || pageNum < 1){
          pageNum = 1;  
        }
        return (pageNum - 1) * this.pageLimit();
      },
      pageLimit:function(){
        return 10;
      },
      totalPages:function(totalNum){

        var total =parseInt((totalNum + this.pageLimit() - 1) / this.pageLimit()),
            arrayTotalPages = [];

        for(var i=1; i<= total; i++){
          arrayTotalPages.push(i);
        }

        return arrayTotalPages;
      }
    },
    instanceMethods:{
      
    }
  }

});

module.exports = sequelize;