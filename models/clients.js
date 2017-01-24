var Sequelize = require('sequelize');
var sequelize = module.parent.exports.sequelize;

var Client = sequelize.define('Clients', {
	idClient : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
	name  : Sequelize.TEXT,
	email : Sequelize.TEXT,
	phone : Sequelize.TEXT
}, {
	timestamps: false
});

module.exports = Client;
