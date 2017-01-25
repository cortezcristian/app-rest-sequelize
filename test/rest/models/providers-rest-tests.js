// Providers REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
var sequelize = exports.sequelize = require('../../../db/conn.js');

// Global Variables for the test case
var Provider, provider, agent, providerId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Provider '+d+"/api/v1/providers", function(){
    before(function(done){
        // Before all tests
        Provider = require("../../../models/providers.js");
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();

        // It show create a new document in the database
        provider = Provider.build({ name: 'provider'+Math.floor((Math.random() * 10) + 1)});
        provider.save().then(function(record){
            providerId = record.get('idProvider');
            done()
        }).catch(function(error) {
            done(error);
        });
    });

    describe('Providers REST', function(){
        it('GET /api/v1/providers', function(done){
            agent
              .get(d+'/api/v1/providers')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/providers?count=1', function(done){
            agent
              .get(d+'/api/v1/providers?count=1')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length === 1);
                  done();
              });
        });
        it('POST /api/v1/providers', function(done){
            agent
              .post(d+'/api/v1/providers')
              .send({ name: 'Test Creation Provider' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Provider');
                  done();
              });
        });
        it('PUT /api/v1/providers/:providerId', function(done){
            console.log("Provider ID:", providerId);
            agent
              .put(d+'/api/v1/providers/'+providerId)
              .send({ name: 'Test Change Provider' })
              .end(function(res) {
                  assert.ok(res.ok);
                  console.log("PUT: ", res.body);
                  assert.ok(res.body.name === 'Test Change Provider');
                  done();
              });
        });
        it('DELETE /api/v1/providers/:providerId', function(done){
            agent
              .del(d+'/api/v1/providers/'+providerId)
              .end(function(res) {
                  assert.ok(res.ok);
                  console.log(res.body);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
