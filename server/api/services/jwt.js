const jwt = require('jsonwebtoken');
//const app = require('config/express')();
//const key = app.get('key');

const JWT_SECRET_KEY = 'vintesete';


module.exports = {
    // gera uma chave JWT com os dados userId e userRole do USER passado como parametro
    // retorna a chave gerada
    jwtGenAccess: function (user) {
        const userId = user.userId;
        const role = user.userRole;
        const tokenPayload = { userId, role };
        const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
        return accessToken;
    },
    // middleware para verificacao do JWT enviado pelo Client-side
    authenticationMiddleware: function (req, res, nextHandler) {
        // pegando o token do HEADER de requisicao
        const accessToken = getAccessTokenFromHeader(req);
      
        try {
          // retirando o tokenPayload atraves das informacoes de acesso
          const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
          // implementado o tokenPayload em uma variavel na response que foi enviada
          res.locals.user = tokenPayload;
          nextHandler();
        } catch (error) {
          res.status(401).send(error.message);
        }
      }
};

