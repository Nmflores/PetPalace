const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const encrypt = require("../services/encrypt");

let usersResult = function async(result) {
  if (result.length > 0) {
    // CREATE A JSON RESPONSE TO SEND
    const response = {
      users: result.map((user) => {
        return {
          userId: user.user_id,
          firstName: user.first_name,
          secondName: user.second_name,
          userGender: user.user_gender,
          userRole: user.user_role,
          cpf: user.cpf,
          loyalty: user.loyalty,
          address: user.address,
          addressNbr: user.adress_nbr,
          district: user.district,
          cep: user.cep,
          state: user.state,
        };
      }),
    };
    return response;
  } else {
    return { msg: "Nenhum usuario cadastrado" };
  }
};

let errorHandler = function async(error) {
  if (error.errno === 1062) {
    return `Usuario ja cadastrado no sistema`;
  }
};

module.exports = (app) => {
  const dbConn = app.get("dbConn");
  const controller = {};

  controller.listUsers = async (req, res) => {
    // GET ALL INFO OF THE 10 FIRST USERS ON THE TABLE
    const query = "SELECT * FROM USERS LIMIT 10;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, (err, result) => {
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
      "SELECT * FROM USERS A, WORKER_SERVICES B WHERE A.USER_ROLE = 1;";

    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, [], (err, result) => {
      if (err) res.status(404).send(err);
      else {
        const response = usersResult(result);
        res.status(200).send(response);
      }
    });
  };

  controller.listClients = (req, res) => {
    // GET USERS WITH userRole as 2(CLIENT)
    const query = "SELECT * FROM USERS A WHERE A.USER_ROLE = 2;";
    dbConn.pool.query(query, (err, result) => {
      if (err) {
        return res.status(404).send("Nenhum Cliente cadastrado");
      } else {
        const response = usersResult(result);
        return res.status(200).send(response);
      }
    });
  };

  controller.getUser = (req, res) => {
    // GET USERID FROM REQ PARAMS
    const { userId } = req.params;
    // GET ALL INFO OF THE USER PER USERID
    const query = "SELECT * FROM USERS A WHERE A.USER_ID = ?;";
    // CALL THE EXECUTE PASSING THE QUERY
    dbConn.pool.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(404).send("Usuario nao cadastrado");
      } else {
        const response = usersResult(result);
        return res.status(200).send(response);
      }
    });
  };

  controller.saveUser = async (req, res) => {
    // Setando variavel para verificar o userRole
    let userId = uuidV4();

    // DISMEMBER THE REQ.BODY
    const {
      username,
      firstName,
      secondName,
      email,
      userGender,
      userRole,
      password,
      cpf,
      address,
      addressNbr,
      district,
      cep,
      state,
    } = req.body;

    // CREATE A CONST PARAMS THAT CONTAINS ALL THE REQ.BODY PARAMS FOR THE INSERTION QUERY
    // PASSES A GENERATED UUID FOR THE USER_ID
    const userParams = [
      userId,
      firstName,
      secondName,
      userGender,
      userRole,
      cpf,
      address,
      addressNbr,
      district,
      cep,
      state,
    ];

    // CREATE A CONST PARAMS THAT CONTAINS ALL THE REQ.BODY PARAMS FOR THE INSERTION QUERY
    // PASSES A GENERATED UUID FOR THE USER_ID
    const loginParams = [userId, username, email, password];
    // CREATE THE INSERTION QUERY FOR THE USERS TABLE
    const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, USER_ROLE, CPF, ADDRESS, ADDRESS_NBR, DISTRICT, CEP, STATE) VALUES(?,?,?,?,?,?,?,?,?, ?,?);`;
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, userParams, (err, result) => {
      if (err) res.status(404).send({ msg: errorHandler(err) });
      else {
        // CREATE THE INSERTION QUERY FOR THE USERS_AUTH TABLE
        const query = `INSERT INTO USERS_AUTH(USER_ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ? ,?)`;
        dbConn.pool.query(query, loginParams, (err, result) => {
          if (err) res.status(404).send({ msg: errorHandler(err) });
          else {
            res
              .status(200)
              .send({ msg: `Prestador ${firstName} cadastrado com sucesso` });
          }
        });
      }
    });
  };

  // REMOVE USER PER USERID
  controller.removeUser = (req, res) => {
    // GET USERID FROM THE REQ PARAMS
    const { userId } = req.params;
    // CREATE THE INSERTION QUERY
    const query = "DELETE FROM USERS WHERE USER_ID = ?;";
    dbConn.pool.query(query, userId, (err, result) => {
      if (err) res.status(404).send({ msg: errorHandler(err) });
      else {
        if (result.affectedRows === 1) {
          res.status(200).send({ msg: "Usuario deletado com sucesso" });
        }
      }
    });
  };

  // UPDATE USER PER USERID
  controller.updateUser = (req, res) => {
    // GET USERID FROM THE REQ PARAMS
    const { userId } = req.params;
    // CREATE THE UPDATE QUERY
    const query = "SELECT A.first_name FROM USERS A WHERE USER_ID = ?;";
    dbConn.pool.query(query, userId, (err, result) => {
      if (err) res.status(404).send({ msg: errorHandler(err) });
      else {
        if(result.length > 0){
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
      
          // CREATE A CONST PARAMS THAT CONTAINS ALL THE REQ.BODY PARAMS FOR THE INSERTION QUERY
          // PASSES A GENERATED UUID FOR THE USER_ID
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
          dbConn.pool.query(query, userParams, (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).send({ msg: errorHandler(err) })
            }
            else { res.status(404).send({ msg: 'Usuario alterado com sucesso' }); }
          });
        }else{
          res.status(200).send({ msg: 'Usuario nao encontrado' });
        }
      }
    })
}

  return controller;
};
