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
  Provider  = require('../models/providers.js');
  /* models:end */

// ## Public Rest
// --------------------------------------

// Initialize epilogue
epilogue.initialize({
  app       : app,
  sequelize : sequelize
});

// Create REST resources
var clientResource = epilogue.resource({
  model: Client,
  endpoints: ['/api/v1/clients', '/api/v1/clients/:id']
});

var providerResource = epilogue.resource({
  model: Provider,
  endpoints: ['/api/v1/providers', '/api/v1/providers/:idProvider']
});

sequelize.sync({force:true});

/*
app.get('/clients', function(req, res){
  Client.findAll().then(function(result){
    res.json(result);
  });
});
*/




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

