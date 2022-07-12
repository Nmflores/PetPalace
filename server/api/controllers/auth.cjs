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
        const {
          accessToken,
          data,
          isLogged
        } = result
        if (result.isLogged === true) {
          {
            /*res.cookie('accessToken', accessToken, {
                        maxAge: 60 * 60 * 1000, // 1 hour
                        httpOnly: true,
                        secure: false,
                        sameSite: false,
                      })*/
          }
          res.status(200).json({
            data: data,
            accessToken: accessToken,
            isLogged: isLogged
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

    const {
      email,
      password,
      firstName,
      secondName,
      contactNbr,
    } = req.body;

    if (
      email &&
      password &&
      firstName &&
      secondName &&
      contactNbr &&
      email &&
      password

    ) {
      const userParams = [
        userId,
        email,
        password, 
        firstName,
        secondName,
        contactNbr
      ]


      console.log("userParams: ", userParams)

      const callCreateLoyalty = async () => {
        await createLoyalty(userId)
      }


      const query = `INSERT INTO USERS(USER_ID, EMAIL, PASSWORD, FIRST_NAME, SECOND_NAME, CONTACT_NBR) VALUES(?);`;
      pool.query(query, [userParams], (err, result) => {
        if (err) {
          console.log(err)
          if (err.sqlMessage.includes('user_id')) {
            res.status(400).json({
              data: 'Usuario com este ID ja esta cadastrado'
            })
          } else if (err.sqlMessage.includes('email')) {
            res.status(400).json({
              data: 'Usuario com este email já esta cadastrado'
            })
          }
        } else {
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
  }

  return controller;
};