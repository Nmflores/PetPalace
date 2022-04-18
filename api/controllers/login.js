const bcrypt = require('bcryptjs');
const accessToken = require('../services/jwt');
const encrypt = require('../services/encrypt');




module.exports = app => {
  const usersMockDB = app.data.usersMock;
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
        // generate salt to hash password
        const user = usersMock.data[foundUserIndex];
        const salt =  user.salt;
        // now we set user password to hashed password
        let userHashed  = await bcrypt.hashSync(password, salt);
        // check user password with hashed password stored in the database
        // user input pass -- database pass
        let validPassword = await bcrypt.compare(user.password, userHashed);
        console.log("VERIFICANDO VARIAVEIS SENHA");
        console.log(`USER INPUT: ${password}`);
        console.log(`USER SALT: ${salt}`);
        console.log(`USER HASHED PASSWORD: ${userHashed}`);
        console.log(`EVALUATES: ${validPassword}`);

        // Gerando JWT, token de acesso
        let jaywabliuT = accessToken.jwtGenAccess(user);
        console.log(`JWT ACCESS TOKEN: ${jaywabliuT}`);

        
        
        if(validPassword === false){
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




