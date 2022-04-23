const bcrypt = require('bcryptjs');
const accessToken = require('../services/jwt');
const encrypt = require('../services/encrypt');




module.exports = app => {
  const usersMockDB = app.data.dbMock;
  const controller = {};

  const {
    users: usersMock,
  } = usersMockDB;

 
  controller.login = async (req, res) => {
    const {
      username,
      password
    } = req.body;


    const foundUserIndex = usersMock.data.findIndex(user => user.username === username);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuario nao encontrado na base.',
        success: false,
      });
    } else {
        /* Cria variavel user para re-uso
        const user = usersMock.data[foundUserIndex];
        // Gerando JWT, token de acesso
        let jwtToken = accessToken.jwtGenAccess(user);
        console.log(`JWT ACCESS TOKEN: ${jwtToken}`);*/


        if(usersMock.data[foundUserIndex].password === password){
          res.status(200).json({
            message: 'Usuario encontrado e logado com sucesso!',
            success: true,
            });
        }else{
          res.status(404).json({
            message: 'Senha incorreta.',
            success: false,
          });
        }
        }
    }
    return controller;
  };




