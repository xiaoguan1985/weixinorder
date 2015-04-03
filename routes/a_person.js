/**
 * Created by apple on 15/3/9.
 */


var config = require('../config.default');
var moment = require('moment');
var Person = require('../models/person');


/* 显示用户 */
exports.showPerson = function(req, res){


    Person.findAndCountAll({ offset:Person.pageOffset(req.query.pageNum), limit:Person.pageLimit()}).then(function(row){

        res.render('a_person', {
            title: '分类管理',
            personList : row.rows,
            pages:{
                totalPages:Person.totalPages(row.count),
                currentPage:req.query.pageNum,
                router:'person'
            }
        });

    });


};


//修改和添加
exports.person = function(req, res){

    var id = req.body.personId;

    if(id != '' && id != undefined){

        Person.find(id).success(function(a){

            a.updateAttributes({

                name:req.body.cname

            }).success(function(){

                return res.redirect('/admin/person');
            })

        });

    }else{

        console.log(1);

        var person = Person.build({
            name : req.body.cname
        });

        Person.sync();

        person.save()
            .then(function(err){

                if(err){
                    console.log("返回的信息：" + JSON.stringify(err));
                }

                res.redirect('/admin/person');
            });

    }


};


//删除
exports.delperson = function(req, res){

    var id = req.body.personId;



};


//创建用户
exports.createPerson = function(userName, callback){

    Person.findAll({ where: { name: userName } }).then(function(p) {

        if(p && p.length > 0){

            callback();

        }else{

            var person = Person.build({
                name : userName
            });

            person.save()
                .then(function(){

                    callback();
                });
        }
    })


};



