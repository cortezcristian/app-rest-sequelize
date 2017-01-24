var Sequelize = require('sequelize');
var sequelize = module.parent.exports.sequelize;

var Provider = sequelize.define('Providers', {
	idProvider : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
	name  : Sequelize.TEXT
}, {
	timestamps: false
});

module.exports = Provider;
