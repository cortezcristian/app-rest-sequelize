var assert = require('assert');
var sequelize = exports.sequelize = require('../../../db/conn.js');
var Provider = require('../../../models/providers.js');

describe('Providers Tests', function() {

  it('should create a provider', function(done) {
    Provider
      .create({name: 'ProviderName'})
      .then(function(record){
        assert.ok(record.get('name') === 'ProviderName', 'Name does not match');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
