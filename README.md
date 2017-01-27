Sequelize Express Angular App [![Build Status](https://travis-ci.org/cortezcristian/app-rest-sequelize.svg?branch=master)](https://travis-ci.org/cortezcristian/app-rest-sequelize) [![Dependencies](https://david-dm.org/cortezcristian/app-rest-sequelize.svg)](https://david-dm.org/cortezcristian/app-rest-sequelize)
========


- [Usage](#usage)
- [Setup](#Setup)
  - [Installation](#installation)
  - [Development](#development)
  - [Testing](#testing)
  - [MySQL](#mysql)
- [Deliverables](#deliverables)
  - [Backend](#backend)
  - [Frontend](#backend)
- [Documentation](#Documentation)
  - [Docs](#docs)
  - [Logs](#logs)
  - [Notes](#notes)
- [Credits](#credits)

## Usage

See the [short demo video](https://youtu.be/btxVmpjj3Eg)

When application starts you will see the Clients list:

<img src="https://www.dropbox.com/s/jfgqo33abzquoq8/Screenshot%202017-01-26%2009.56.35.png?dl=1" width="600" />

It will allow you to create a new one, edit and batch remove by selecting and pressing the remove button on top.

<img src="https://www.dropbox.com/s/8ytc3grr2dar5og/Screenshot%202017-01-26%2010.00.51.png?dl=1" width="600" />

While editing or creating you can update Providers.

<img src="https://www.dropbox.com/s/h7k2xvl0ytb39nu/Screenshot%202017-01-26%2010.03.38.png?dl=1" width="600" />

Messages on the bottom right corner will keep you updated about the status of the operations

## Setup

### Installation

After installing Node.JS (v5.7.0) and Git please make sure you have Mocha, Bower and Grunt clients.

```
$ npm install -g grunt-cli bower mocha
```

Being on the main project folder run:

```
$ git clone git@github.com:cortezcristian/app-rest-sequelize.git
$ cd app-rest-sequelize
$ npm i && bower i && grunt --force
```

### Development

Run `grunt` for start developer mode.

```
$ grunt
```

### Testing

You run different kind of tests. In example to run the unit tests:

```
$ mocha test/unit
```

Test the rest api enpoints:

```
$ npm start & # start the server first
$ mocha test/rest
```

Note: Todo refactor angular, create service and add some karma/jasmine tests

### MySQL

Setup MySQL: first create a database

```
$ mysql -h localhost -u root -p
> mysql> create database sequelizedb;
Query OK, 1 row affected (0.00 sec)
```

After that alter the configuration file [config/config-local.json](config/config-local.json), and change database type and credentials:

```
"db": {
    "type" : "mysql",
    "sync" : "enabled",
    "domain" : "33.33.33.1",
    "port" : "3306",
    "name" : "sequelizedb",
    "user" : "root",
    "pass" : "root",
    "file" : "database.sqlite"
},
```

Restart the server, and start using the application. If everything goes ok, you'll be able to see this tables:

```
mysql> use sequelizedb
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+-----------------------+
| Tables_in_sequelizedb |
+-----------------------+
| ClientProviders       |
| Clients               |
| Providers             |
+-----------------------+
3 rows in set (0.00 sec)
```



## Deliverables

### Backend

- Models:
  - Client [models/clients.js](./models/clients.js)
  - Client Unit Test [test/unit/models/clients-tests.js](./test/unit/models/clients-tests.js)
  - Provider [models/providers.js](./models/providers.js)
  - Provider Unit Test [test/unit/models/providers-tests.js](./test/unit/models/providers-tests.js)
- Rest:
  - Api Rest [routes/apis.js](/routes/apis.js)
  - Client Rest Test [test/rest/models/clients-rest-tests.js](./test/rest/models/clients-rest-tests.js)
  - Provider Rest Test [test/rest/models/providers-rest-tests.js](./test/rest/models/providers-rest-tests.js)

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
- [PR#3](https://github.com/cortezcristian/app-rest-sequelize/pull/3)
Create SPA using AngularJS, added controllers, views, etc.
- [PR#4](https://github.com/cortezcristian/app-rest-sequelize/pull/4)
Refactoring, global configurations, user experience, added jasmine tests
- [PR#5](https://github.com/cortezcristian/app-rest-sequelize/pull/5)
Hook sync db and mysql configs, database setup instructions

### Notes

Facts about this implementation:
- About databases: the current project uses sqlite for local and testing environments. And mysql for staging and production, please feel free to modify the configuration under the config folder. In this way we achieve flexibility and local development can be made with one db or the other.
- The project uses Express and Epilogue to leverage the API Rest servicies.
- All database comunicatoin is being handled with the Sequelize ORM.
- The front-end is a SPA, the index.html was converted into index.jade because different enviroments load different assets. In example production load only minified and optimized scripts while development env loads the full sources.
- This app relies on Bootstrap and Stylus to manage the styles of the SPA.
- Big part of the initial code was generated with a mean framework I have built [repo cortezcristian/anyandgo](https://github.com/cortezcristian/anyandgo), just stripped parts of it that were not needed and hacked it to work with relational databases.


## Credits
[@cortezcristian](https://twitter.com/cortezcristian)
