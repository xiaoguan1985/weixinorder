/**
 * Created by apple on 15/3/9.
 */

var person = require('../routes/a_person');


var events = require('events');
var emitter = new events.EventEmitter();


/*
 创建用户事件监听 redis  node
 */
emitter.on('create_person',  person.createPerson);



module.exports = emitter;




