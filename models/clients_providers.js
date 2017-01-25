var Sequelize = require('sequelize');
var sequelize = module.parent.exports.sequelize;

var ClientProviders = sequelize.define('ClientProviders', {
	id    : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true }
}, {
	timestamps: false
});

module.exports = ClientProviders;
