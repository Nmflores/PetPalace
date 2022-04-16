const bcrypt = require('bcryptjs');



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
        const salt =  usersMock.data[foundUserIndex].salt;
        // now we set user password to hashed password
        let userHashed = usersMock.data[foundUserIndex].password;
        let newHashedPassword  = await bcrypt.hash(password, salt);
        // check user password with hashed password stored in the database
        // user input pass -- database pass
        let validPassword = await bcrypt.compare(newHashedPassword, userHashed);
        console.log("VERIFICANDO VARIAVEIS SENHA");
        console.log(`USER INPUT: ${password}`);
        console.log(`USER SALT: ${salt}`);
        console.log(`USER HASHED PASSWORD: ${userHashed}`);
        console.log(`LOGIN REHASH PASSWORD: ${newHashedPassword}`);
        console.log(`EVALUATES: ${validPassword}`);

        
        
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




