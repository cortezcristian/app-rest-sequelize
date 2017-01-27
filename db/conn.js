var Sequelize = require('sequelize');
var config = exports.config = require('../config');

var sequelize;
if(config.db.type === "mysql") {
  sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass,
        { host: config.db.domain, port:config.db.port, dialect: 'mysql'});
} else {
  sequelize = new Sequelize(config.db.name, '', '',
        { storage: __dirname+'/database.sqlite', dialect: 'sqlite'});
}


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
