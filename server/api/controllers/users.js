const {
  v4: uuidV4
} = require("uuid");
const bcrypt = require("bcryptjs");
const encrypt = require("../services/encrypt");



module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

  const { checkUser } = app.services.checks


  const { usersResult , errorHandler, messages} = app.services.output
  const controller = {};



  controller.listUsers = async (req, res) => {
    // GET ALL INFO OF THE 10 FIRST USERS ON THE TABLE
    const query = "SELECT * FROM USERS LIMIT 10;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    pool.query(query, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const response = usersResult(result);
        res.status(200).send(response);
      }
    });
  };

  controller.listWorkers = (req, res) => {
    //
    const query =
      "SELECT A.* FROM USERS A, WORKER_SERVICES B WHERE A.USER_ID = B.USER_ID ;";

    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    pool.query(query, [], (err, result) => {
      if (err) res.status(404).send(err);
      else {
        const response = usersResult(result);
        res.status(200).send(response);
      }
    });
  };



  controller.getUser = async (req, res) => {
    // GET USERID FROM REQ PARAMS
    const {
      userId
    } = req.params;
    if (await checkUser(userId)) {
      const query = "SELECT * FROM USERS A WHERE A.USER_ID = ?;";
      pool.query(query, [userId], (err, result) => {
        const response = usersResult(result);
        return res.status(200).send(response);
      })
    } else {
      return res.status(404).send({
        msg: messages(1)
      });
    }


  };


  // REMOVE USER PER USERID
  controller.removeUser = async (req, res) => {
    // GET USERID FROM THE REQ PARAMS
    const {
      userId
    } = req.params;
    if (await checkUser(userId)) {
      const query = "DELETE FROM USERS WHERE USER_ID = ?;";
      pool.query(query, userId, (err, result) => {
        if (err) res.status(404).send({
          msg: errorHandler(err)
        });
        else {
          if (result.affectedRows === 1) {
            res.status(200).send({
              msg: "Usuario deletado com sucesso"
            });
          }
        }
      });
    } else {
      return res.status(404).send({
        msg: messages(1)
      });
    }

  };

  // UPDATE USER PER USERID
  controller.updateUser = async (req, res) => {
    const {
      userId
    } = req.params;
    const {
      firstName,
      secondName,
      userGender,
      cpf,
      loyalty,
      address,
      addressNbr,
      district,
      cep,
      state,
    } = req.body;
    if (await checkUser(userId)) {
      const userParams = [
        firstName,
        secondName,
        userGender,
        cpf,
        loyalty,
        address,
        addressNbr,
        district,
        cep,
        state,
        userId
      ];

      // CREATE THE INSERTION QUERY FOR THE USERS TABLE
      const query = `UPDATE USERS SET first_name = ?,second_name = ?,
        user_gender = ?,
        cpf = ?,
        loyalty = ?,
        address = ?,
        address_nbr = ?,
        district = ?,
        cep = ?,
        state = ? WHERE USER_ID = ?;`;
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, userParams, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send({
            msg: errorHandler(err)
          })
        } else {
          res.status(404).send({
            msg: 'Usuario alterado com sucesso'
          });
        }
      });

    } else {
      res.status(200).send({
        msg: messages(1)
      });
    }

  }

  return controller;
};