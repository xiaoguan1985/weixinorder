/**
 * Created by apple on 15/3/9.
 */

var Sequelize = require('sequelize');
var sequelize = require('../routes/weixin_sequelize');



var Person = sequelize.define('Person',{
    name:{ type:Sequelize.STRING, validate:{} },

    isAdmin:{type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

module.exports = Person;
