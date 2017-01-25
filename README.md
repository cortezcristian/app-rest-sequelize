Sequelize Express Angular App [![Build Status](https://travis-ci.org/cortezcristian/app-rest-sequelize.svg?branch=master)](https://travis-ci.org/cortezcristian/app-rest-sequelize) [![Dependencies](https://david-dm.org/cortezcristian/app-rest-sequelize.svg)](https://david-dm.org/cortezcristian/app-rest-sequelize)
========


- [Usage](#usage)
	- [Installation](#installation)
	- [Development](#development)
	- [Testing](#testing)
	- [User Experience](#User Experience)
- [Deliverables](#deliverables)
  - [Backend](#backend)
  - [Frontend](#backend)
- [Documentation](#Documentation)
	- [Docs](#docs)
	- [Logs](#logs)

## Usage

### Installation

After installing Node.JS (v5.7.0) and Git please make sure you have Mocha, Bower and Grunt clients.

```
$ npm install -g grunt-cli bower mocha
```

Being on the main project folder run:

```
$ npm i && grunt
```

### Development

Run `grunt` for building and `grunt serve` for preview.

```
$ grunt serve --force
```

### Testing

Run models unit tests

```
$ mocha test/unit
```

Running `grunt test` will run the unit tests with karma.

```
$ grunt test --force
```

## Deliverables

### Backend

- Models:
  - Client [models/clients.js](./models/clients.js)
  - Client Unit Test [test/unit/models/clients-tests.js](./test/unit/models/clients-tests.js)
  - Provider [models/providers.js](./models/providers.js)
  - Provider Unit Test [test/unit/models/providers-tests.js](./test/unit/models/providers-tests.js)
- Rest:
  - Client Rest Test [test/rest/models/clients-tests.js](./test/rest/models/clients-tests.js)

### Frontend

## Documentation

### Docs

Documentation can be access via the links on the top menu.

- Model were documented with docco
- Rest APIs were documente with apidoc
- Angular was documented with docular

### Logs
- Kickstart
In order to gain velocity project was generated with [cortezcristian/anyandgo](http://anyandgo.io/)
- [PR#1](https://github.com/cortezcristian/app-rest-sequelize/pull/1)
Simplify structure and update dependencies, tweak test suite, integrate ci
- [PR#2](https://github.com/cortezcristian/app-rest-sequelize/pull/2)
Build APIs, create rest tests initially, implement epilogue and make them pass

## Express 4.x
Facts about this implementation:
- Jade template engine

Modules added:
+ [Stylus](http://learnboost.github.io/stylus/)
+ [i18n](https://github.com/mashpie/i18n-node)
+ [Mongoose](http://mongoosejs.com/)
+ [Express-Restify-Mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

Front end assets:
+ [Bootstrap](http://angular-ui.github.io/bootstrap/)
+ [UI Bootstrap](http://angular-ui.github.io/bootstrap/)


## Credits
[@cortezcristian](https://twitter.com/cortezcristian)
