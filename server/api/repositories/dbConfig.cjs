const mysql      = require('mysql');
const config     = require('config');
const app        = require('express')();


module.exports = app => {
    const dbConfig = {};

    dbConfig.initPool = () => {
      const pool = mysql.createPool({
        host: config.get('database.host'),
        user: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.databaseName'),
      });
      return pool
    }
    return dbConfig
}






   

