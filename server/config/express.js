const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const dbConfig = require('./dbConfig');
const consign    = require('consign');
const cors       = require('cors');



module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  app.set('key', config.get('jwt.key'));
  app.set('dbConn', dbConfig);

  // MIDDLEWARES
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // ENDPOINTS -- ligando pastas a entidade do express
  consign({cwd: 'api'})
    .then('controllers')
    .then('routes')
    .then('services')
    .into(app);

  return app;
};