
var weixin = require('weixin-api'),
    config = require('../config.default'),
    emitter = require('../routes/base_event');


/* 微信消息 */
exports.index = function(req, res){
  
  res.render('index', { title: '欢迎光临微信点餐系统！' });
};

weixin.token = config.weixin_token;
weixin.textMsg(function(msg){

    emitter.emit('create_person',msg.fromUserName,function(){

    });


  var resMsg = {};

  switch(msg.content){

    case "1":
      resMsg = {

        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "text",
        content : "宫爆鸡丁 10¥",
        funcFlag : 0
      };
      break;

    case "2":
      resMsg = {

        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "text",
        content : "鸡蛋炒饼 8¥",
        funcFlag : 0
      };
      break;

    case "3":
      var articles = [];
      articles[0] = {
          title : "今日菜单",
          description : "打折菜应有尽有",
          picUrl : "http://114.215.117.20/images/order/yuezi.png",
          url : "http://114.215.117.20/customer/order"
      };

      articles[1] = {
          title : "月子餐",
          description : "营养餐 补充营养",
          picUrl : "http://114.215.117.20/images/order/caidan.png",
          url : "http://114.215.117.20/customer/orders"
      };
      resMsg = {
          fromUserName : msg.toUserName,
          toUserName : msg.fromUserName,
          msgType : "news",
          articles : articles,
          funcFlag : 0
      };

      break;
  }

  weixin.sendMsg(resMsg);

});

/* 微信消息 */
exports.checkSignature = function(req, res){
  
  if (weixin.checkSignature(req)) {
    
    res.send(200, req.query.echostr);

  } else {

    res.send(200, 'fail');
  }

};


exports.loopMsg = function(req, res){
  weixin.loop(req, res);
};



