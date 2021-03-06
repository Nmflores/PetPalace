const bcrypt = require("bcryptjs");
const {
  v4: uuidV4
} = require("uuid");





module.exports = app => {
  const dbConn = app.repositories.dbConfig;
  const pool = dbConn.initPool();
  const controller = {};
  const {
    checkUserPerEmail
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
      email,
      password
    } = req.body;
    if (email && password) {
      if (await checkUserPerEmail(email)) {
        const result = await logIn(email, password)
        console.log("1", result)
        const {accessToken, data, isLogged} = result
        if (result.isLogged === true) {
          {/*res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: false,
            sameSite: false,
          })*/}
          res.status(200).json({
            data: data, accessToken: accessToken, isLogged: isLogged
          })
        } else {
          res.status(result.status).json({
            data: data
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
    console.log(req.body)
    const {
      email,
      password,
      firstName,
      secondName,
      userGender,
      contactNbr,
      cpf,
    } = req.body;

    if (
      email &&
      password &&
      firstName &&
      secondName &&
      userGender &&
      contactNbr 
      
    ) {
      const userParams = [
        userId,
        firstName,
        secondName,
        userGender,
        contactNbr,
        cpf
      ]

      const loginParams = [userId, email, password];

      
      const callCreateLoyalty = async () => {
        await createLoyalty(userId)
      }

      const callRegisterAuth = async (loginParams) => {
        const query = `INSERT INTO USERS_AUTH(USER_ID, EMAIL, PASSWORD) VALUES(?)`;
        pool.query(query, [loginParams], (err, result) => {
          if (err) {
            if (err.sqlMessage.includes('email')) {
              res.status(400).json({
                data: 'Usuario com este email já esta cadastrado'
              })
            }
          } else {
            console.log("query auth: ", result)
            if (result.affectedRows > 0) {
              //callCreateLoyalty()
              res.status(201).json({
                data: 'Usuario cadastrado com sucesso'
              })
            } else {
              res.status(400).json({
                data: 'Cadastro de usuario falhou'
              })
            }
          }
        })
      }



      const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, CONTACT_NBR, CPF) VALUES(?);`;
      pool.query(query, [userParams], (err, result) => {
        console.log("query users:", result)

        if (err) {
          console.log(err)
          if (err.sqlMessage.includes('cpf')) {
            res.status(400).json({
              data: 'Usuario com este CPF ja esta cadastrado'
            })
          } else if (err.sqlMessage.includes('user_id')) {
            res.status(400).json({
              data: 'Usuario com este ID ja esta cadastrado'
            })
          }
        } else {
          console.log(result)
          if (result.affectedRows > 0) {
            console.log(111)

            console.log(userParams, loginParams)
            callRegisterAuth(loginParams)
          } else {
            console.log(222)
            res.status(400).json({
              data: "Cadastro de Usuario falhou"
            })
          }
        }
      })
    }
  };

  return controller;
};