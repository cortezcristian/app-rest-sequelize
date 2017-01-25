// # Site Routes
// --------------------------------------
// contains all the routes of the site including pages, and rest api services.
//
// 1. Public Routes
// 2. Admin Routes
//
// requires
// * app
// * config
var app = module.parent.exports.app,
  config = module.parent.exports.config,
  logger = module.parent.exports.logger,
  anyandgo = module.parent.exports.anyandgo,
  // ## Models
  /* models:start */
  // Admins        = require('../models/admins.js'),
  Sample  = require('../models/sample.js'),
  Admins  = require('../models/admins.js'),
  User  = require('../models/user.js'),
  /* models:end */
  // ### Authorizers
  // Mantain certains part from the application secure
  // preventing not authenticated actors access to private parts
  // according to their roles
  /* authorizers:start */
  adminAuth = require('../auth/admin-auth.js'),
  /* authorizers:end */
  /* forms:start */
  adminLoginForm = require('../forms/admin-login.js'),
  /* forms:end */
  restify = require('express-restify-mongoose'),
  mongooseForms = require('mongoose-forms'),
  Handlebars = require('handlebars');

  /* models:registration:start */
  anyandgo.models['sample']  = Sample;
  anyandgo.models['user']  = User;
  /* models:registration:end */


// ## 1. Public Routes
// --------------------------------------

// ### Home Page
app.get('/', function (req, res) {
    res.render('index', { title: 'anyandgo', section: 'Home' });
});

/* page:public:start */

/* page:public:end */
