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
    createAccessToken
  } = app.services.accessToken;
  const {
    createLoyalty
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
    console.log(req.body)
    if (username && password) {
      // VERIFY USERNAME
      if (await checkUserPerUserName(username)) {
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
              // CHECK PASSWORD
              const query =
                "SELECT A.USER_ID FROM USERS_AUTH A WHERE A.USERNAME = ? AND A.PASSWORD = ?;";
              pool.query(query, [username, password], (err, result) => {
                if (err) {
                  res.status(404).send(err);
                } else {
                  if (result.length > 0) {
                    //CREATES JWT WITH USER_ID 
                    const accessToken = createAccessToken(result);
                    console.log(accessToken);
                    res.cookie('x-access-token', accessToken, {
                      maxAge: 60 * 60 * 1000, // 1 hour
                      httpOnly: true,
                      secure: true,
                      sameSite: true,
                    })
                    res.status(200).send({
                      auth: true
                    });
                  } else {
                    res
                      .status(404)
                      .send({
                        loginStatus: 0,
                        msg: "Credenciais incorretas, digite novamente"
                      });
                  }
                }
              });
            
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

      const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, CPF, ADDRESS, ADDRESS_NBR, DISTRICT, CEP, STATE) VALUES(?,?,?,?,?,?,?,?,?,?);`;

      pool.query(query, userParams, (err, result) => {
        if (err) res.status(404).send({
          msg: errorHandler(err)
        });
        else {
          const query = `INSERT INTO USERS_AUTH(USER_ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ? ,?)`;
          pool.query(query, loginParams, (err, result) => {
            if (err) res.status(404).json({
              registerStatus: 0,
              msg: errorHandler(err)
            });
            else {
              if(createLoyalty(userId)){
                res
                .status(200)
                .json({
                  registerStatus: 1,
                  msg: `Usuario ${firstName} cadastrado com sucesso`
                });
              }else{
                res
                .status(200)
                .json({
                  registerStatus: 0,
                  msg: `Erro ao cadastrar lealdade de usuario`
                });
              }
              
            }
          });
        }
      });
    } else {
      res
        .status(200)
        .json({
          msg: `Faltam informaçoes para continuar com o cadastro`
        });
    }
  };

  return controller;
};