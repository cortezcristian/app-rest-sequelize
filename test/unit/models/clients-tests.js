var assert = require('assert');
var sequelize = exports.sequelize = require('../../../db/conn.js');
var Client = require('../../../models/clients.js');

describe('Clients Tests', function() {

  it('should create a client', function(done) {
    Client
      .create({email: 'none@none.com'})
      .then(function(record){
        assert.ok(record.get('email') === 'none@none.com', 'Email does not match');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
