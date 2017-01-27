// # Site Routes
// --------------------------------------
// contains all the routes of the site including pages, and rest api services.
//
// 1. Public Routes
// 2. Rest Routes
//
// requires
// * app
// * config
var app = module.parent.exports.app,
  config = module.parent.exports.config,
  sequelize = exports.sequelize = module.parent.exports.sequelize,
  epilogue = module.parent.exports.epilogue,
  logger = module.parent.exports.logger;
// ## Models
var Client  = require('../models/clients.js'),
  Provider  = require('../models/providers.js'),
  ClientProviders  = require('../models/clients_providers.js');

// Setup: Belongs-To-Many associations
// http://docs.sequelizejs.com/en/latest/docs/associations/#belongs-to-many-associations
Client.belongsToMany(Provider, {through: 'ClientProviders'});
Provider.belongsToMany(Client, {through: 'ClientProviders'});

// ## Public Rest
// --------------------------------------

// Initialize epilogue
epilogue.initialize({
  app       : app,
  sequelize : sequelize
});

// Create REST resources

/**
 * @api {get} /clients Request Clients List
 * @apiName findAll
 * @apiGroup Clients
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/clients
 *
 * @apiSuccess {Array} List of clients objects
 */
// https://github.com/sequelize/sequelize/issues/1869
var clientResource = epilogue.resource({
  model: Client,
  endpoints: ['/api/v1/clients', '/api/v1/clients/:id'],
  associations: true,
  search: [
    {operator: '$like', param: 'sname', attributes: [ 'name' ]},
    {operator: '$like', param: 'sphone', attributes: [ 'phone' ]},
    {operator: '$like', param: 'semail', attributes: [ 'email' ]}
  ]
});

/**
 * @api {get} /providers Request Providers List
 * @apiName findAll
 * @apiGroup Providers
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/providers
 *
 * @apiSuccess {Array} List of providers objects
 */
var providerResource = epilogue.resource({
  model: Provider,
  endpoints: ['/api/v1/providers', '/api/v1/providers/:id']
});

/**
 * @api {get} /clientproviders Request ClientProviders List
 * @apiName findAll
 * @apiGroup RelationClientProviders
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/clientproviders
 *
 * @apiSuccess {Array} List of relationships between client and providers
 */
var clientproviderResource = epilogue.resource({
  model: ClientProviders,
  endpoints: ['/api/v1/clientproviders', '/api/v1/clientproviders/:id']
});

/**
 * @api {get} /add-providers-to-clients/:clientId/:csvList Save Client Providers Relationships
 * @apiName saveClientProvidersRelationships
 * @apiGroup RelationClientProviders
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/add-providers-to-clients/1/1,2
 *
 * @apiSuccess {Object} Returns the status of the operationD
 */
app.get('/api/v1/add-providers-to-clients/:clientId/:csvList', function(req, res){
  // find the client by id
  // start finding the providers
  // create record in relationship table
  // TODO: add posible errored statuses
  var providersList = [];
  providersList = req.params.csvList.split(',');
  providersList.filter(function(item){
    return !isNaN(parseFloat(item));
  }).map(function(num){ return parseFloat(num); });
  console.log(providersList);

  // Search Providers
  Provider.findAll({ where: { id: providersList } }).then(function(providers) {
    // providers will be an array of Providers having the ids
    console.log("Providers found:", providers.length);
    // Get current client
    Client.findOne({ where: { id: req.params.clientId } }).then(function(client){
      console.log("Client found by id :", req.params.clientId, client);
      // Update relationships
      client.setProviders(providers).then(function(result){
        console.log("Relationships udpated!");
        res.json({ status: 'ok' });
      });
    })
  });

});



/**
 * @api {get} /add-providers-to-clients/:clientId/:csvList Save Client Providers Relationships
 * @apiName saveClientProvidersRelationships
 * @apiGroup RelationClientProviders
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/count/clients
 *
 * @apiSuccess {Object} Returns the status of the operationD
 */
app.get('/api/v1/count/clients', function(req, res){
  Client.count().then(function(result){
    res.json({ "total": result });
  });
});

if (1 || config.db.sync && config.db.sync === "enabled") {
  sequelize.sync({force:true});
}

// CORS Interceptors
if (config.cors && config.cors === "enabled") {
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.options('/api/v1/*', function(req, res){
    res.end();
  });
}

// ## Public Routes
// --------------------------------------

// ### Home Page
app.get('/', function (req, res) {
    res.render('index', { title: 'Sequelize Express Angular App', section: 'Home' });
});
