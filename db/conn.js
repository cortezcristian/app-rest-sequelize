var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', '', '',
      { storage: __dirname+'/database.sqlite', dialect: 'sqlite'});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;
