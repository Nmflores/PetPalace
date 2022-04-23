const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const cors       = require('cors');
const https      = require('https');



module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  app.set('key', config.get('jwt.key'));

  // MIDDLEWARES
  app.use(cors());
  app.use(bodyParser.json());


  // ENDPOINTS -- ligando pastas a entidade do express
  consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .then('services')
    .into(app);

  return app;
};