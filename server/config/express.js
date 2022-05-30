const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const config       = require('config');
const consign      = require('consign');
const cors         = require('cors');
const cookieParser = require('cookie-parser')



module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));
  app.set('jwtKey', config.get('jwt.key'));

  // MIDDLEWARES
  app.use(cookieParser())
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // ENDPOINTS -- ligando pastas a entidade do express
  consign({ cwd: 'api' })
  .then('repositories')
  .then('services')  
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};