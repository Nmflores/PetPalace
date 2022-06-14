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
    logIn,
    createLoyalty
  } = app.services.queries;
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
        console.log("1", result)
        const accessToken = result.data
        if (result.isLogged === true) {
          res.cookie('x-access-token', accessToken, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: true,
            sameSite: true,
          })
          res.status(200).json({
            data: "Usuario logado com sucesso"
          })
        } else {
          res.status(result.status).json({
            data: result.data
          })
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
      email,
      password,
      firstName,
      secondName,
      userGender,
      contactNbr,
      cpf,
      state
    } = req.body;

    if (
      email &&
      password &&
      firstName &&
      secondName &&
      userGender &&
      contactNbr &&
      cpf &&
      state
    ) {
      const userParams = [
        userId,
        firstName,
        secondName,
        userGender,
        contactNbr,
        cpf,
        state
      ];

      const loginParams = [userId, email, password];

      const callRegisterAuth = async (loginParams) => {
        const query = `INSERT INTO USERS_AUTH(USER_ID, EMAIL, PASSWORD) VALUES(?)`;
        pool.query(query, [loginParams], (err, result) => {
          if (err) {
            if (err.sqlMessage.includes('email')) {
              res.status(500).json({
                data: 'Usuario com este email já esta cadastrado'
              })
            }
          } else {
            if (result.affectedRows > 0) {
              callCreateLoyalty()
              res.status(201).json({
                data: 'Usuario cadastrado com sucesso'
              })
            } else {
              res.status(500).json({
                data: 'Cadastro de usuario falhou'
              })
            }
          }
        })
      }

      const callCreateLoyalty = async () => {
        await createLoyalty(userId)
      }


      const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, CPF, STATE) VALUES(?);`;
      pool.query(query, [userParams], (err, result) => {
        if (err) {
          if (err.sqlMessage.includes('cpf')) {
            res.status(500).json({
              data: 'Usuario com este CPF ja esta cadastrado'
            })
          } else if (err.sqlMessage.includes('user_id')) {
            res.status(500).json({
              data: 'Usuario com este ID ja esta cadastrado'
            })
          }
        } else {
          if (result.affectedRows > 0) {
            callRegisterAuth(loginParams)
          } else {
            res.status(500).json({
              data: "Cadastro de Usuario falhou"
            })
          }
        }
      })
    }
  };

  return controller;
};