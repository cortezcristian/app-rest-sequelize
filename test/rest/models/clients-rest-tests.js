// Clients REST API
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
var Client, client, agent, clientId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Client '+d+"/api/v1/clients", function(){
    before(function(done){
        // Before all tests
        Client = require("../../../models/clients.js");
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();

        // It show create a new document in the database
        client = Client.build({ name: 'client'+Math.floor((Math.random() * 10) + 1)});
        client.save().then(function(record){
            clientId = record.get('clientId');
            done()
        }).catch(function(error) {
            done(error);
        });
    });

    describe('Clients REST', function(){
        it('GET /api/v1/clients', function(done){
            agent
              .get(d+'/api/v1/clients')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/clients/count', function(done){
            agent
              .get(d+'/api/v1/clients/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/clients', function(done){
            agent
              .post(d+'/api/v1/clients')
              .send({ name: 'Test Creation Client' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Client');
                  done();
              });
        });
        it('PUT /api/v1/clients/:clientId', function(done){
            agent
              .put(d+'/api/v1/clients/'+clientId)
              .send({ name: 'Test Change Client' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Client');
                  done();
              });
        });
        it('DELETE /api/v1/clients/:clientId', function(done){
            agent
              .del(d+'/api/v1/clients/'+clientId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/clients', function(done){
            agent
              .del(d+'/api/v1/clients/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
