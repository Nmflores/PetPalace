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
    registerUser, registerUserAuth ,createLoyalty, updateLoyalty
  }= app.services.queries;
  const {
    errorHandler,
    messages
  } = app.services.output;


  controller.login = async (req, res) => {
    console.log(await updateLoyalty("169abf14-7dd2-48c6-b7e3-626c90574f7d", 5))
    const {
      username,
      password
    } = req.body;
    if (username && password) {
      if (await checkUserPerUserName(username)) {
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

      const result = await registerUser(userId, userParams,  loginParams)
      console.log("1",result)
      res.status(201).send(result)

    }
  };

  return controller;
};