const bcrypt = require("bcryptjs");
const {
  v4: uuidV4
} = require("uuid");





module.exports = app => {
  const dbConn = app.repositories.dbConfig;
  const pool = dbConn.initPool();
  const controller = {};
  const {
    checkUserPerUserName
  } = app.services.checks;

  const {
    registerUser, logIn, 
  }= app.services.queries;
  const {
    errorHandler,
    messages
  } = app.services.output;


  controller.login = async (req, res) => {
    const {
      username,
      password
    } = req.body;
    if (username && password) {
      if (await checkUserPerUserName(username)) {
                const result = await logIn(username, password)
                console.log("1",result)
                const accessToken = result.data
                if(result.isLogged === true){
                  res.cookie('x-access-token', accessToken, {
                      maxAge: 60 * 60 * 1000, // 1 hour
                      httpOnly: true,
                      secure: true,
                      sameSite: true,
                    })
                  res.status(200).json({data : "Usuario logado com sucesso"})  
                }else{
                  res.status(result.status).json({data : result.data})  
                }

      } else {
        return res.status(404).send({
          msg: messages(1)
        })
      }
    } else {
      res
        .status(404)
        .send({
          msg: `Faltam informaçoes para continuar com o login`
        });
    }


  };

  controller.register = async (req, res) => {
    let userId = uuidV4();

    const {
      username,
      password,
      email,
      firstName,
      secondName,
      userGender,
      cpf,
      address,
      addressNbr,
      district,
      cep,
      state,
    } = req.body;

    if (
      username &&
      password &&
      email &&
      firstName &&
      secondName &&
      userGender &&
      cpf &&
      address &&
      addressNbr &&
      district &&
      cep &&
      state
    ) {
      const userParams = [
        userId,
        firstName,
        secondName,
        userGender,
        cpf,
        address,
        addressNbr,
        district,
        cep,
        state,
      ];

      const loginParams = [userId, username, email, password];

      const result = await registerUser(userId, userParams,  loginParams)
      console.log("1",result)
      res.status(result.status).json({data : result.data})
    }
  };

  return controller;
};