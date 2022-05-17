const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let errorHandler = function async(error) {
  if (error.errno === 1062) {
    return `Usuario ja cadastrado no sistema`;
  }
};

let returnObj = function async(result) {
  console.log(result);
  if (result.length > 0) {
    // CREATE A JSON RESPONSE TO SEND
    const response = {
      users: result.map((user) => {
        return {
          userId: user.user_id,
          userRole: user.user_role,
        };
      }),
    };
    return response;
  }
};

const JWT_SECRET_KEY = "chaveMestra";

let createAuthJwt = function async(user) {
  const userId = user[0]["USER_ID"];
  const role = user[0]["USER_ROLE"];
  const tokenPayload = { userId, role };
  const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
  return accessToken;
};
const { v4: uuidV4 } = require("uuid");

module.exports = (app) => {
  const dbConn = app.get("dbConn");
  const controller = {};

  controller.login = async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      // VERIFY USERNAME
      const query = "SELECT EMAIL FROM USERS_AUTH A WHERE A.USERNAME = ?;";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      dbConn.pool.query(query, [username], (err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          if (result.length > 0) {
            // CHECK PASSWORD
            const query =
              "SELECT A.USER_ID FROM USERS_AUTH A WHERE A.USERNAME = ? AND A.PASSWORD = ?;";
            dbConn.pool.query(query, [username, password], (err, result) => {
              if (err) {
                res.status(404).send(err);
              } else {
                if (result.length > 0) {
                  //CREATES JWT WITH USER_ID AND USER_ROLE
                  const tokenJWT = createAuthJwt(result);
                  console.log(tokenJWT);
                  res.status(200).send({ jwt: tokenJWT });
                } else {
                  res
                    .status(404)
                    .send({ msg: "Credenciais incorretas, digite novamente" });
                }
              }
            });
          } else {
            res
              .status(404)
              .send({ msg: `Credenciais incorretas, digite novamente` });
          }
        }
      });
    } else {
      res
        .status(404)
        .send({ msg: `Faltam informaçoes para continuar com o login` });
    }
  };

  controller.register = async (req, res) => {
    let userId = uuidV4();

    const {
      username,
      firstName,
      secondName,
      email,
      userGender,
      password,
      cpf,
      address,
      addressNbr,
      district,
      cep,
      state,
    } = req.body;

    if (
      username &&
      firstName &&
      secondName &&
      email &&
      userGender &&
      password &&
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

      dbConn.pool.query(query, userParams, (err, result) => {
        if (err) res.status(404).send({ msg: errorHandler(err) });
        else {
          const query = `INSERT INTO USERS_AUTH(USER_ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ? ,?)`;
          dbConn.pool.query(query, loginParams, (err, result) => {
            if (err) res.status(404).send({ msg: errorHandler(err) });
            else {
              res
                .status(200)
                .send({ msg: `Usuario ${firstName} cadastrado com sucesso` });
            }
          });
        }
      });
    } else {
      res
        .status(200)
        .send({ msg: `Faltam informaçoes para continuar com o cadastro` });
    }
  };

  return controller;
};
