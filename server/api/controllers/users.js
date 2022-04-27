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
          addressNbr : user.adress_nbr,
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

let errorHandler = function async(error){
  if(error.errno === 1062){
    return `Usuario ja cadastrado no sistema`
  }
}

module.exports = (app) => {
  const cursor = app.get("cursor");
  const controller = {};

  controller.listUsers = async (req, res) => {
    // GET ALL INFO OF THE 10 FIRST USERS ON THE TABLE
    const query = "SELECT * FROM USERS LIMIT 10;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    cursor.pool.query(query, (err, result) => {
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
    const query = "SELECT * FROM USERS A WHERE A.USER_ROLE = 1;";

    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    cursor.pool.query(query, [], (err, result) => {
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
    cursor.pool.query(query, (err, result) => {
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
    cursor
      .execute(query, [userId])
      .then((result) => {
        if (result.length > 0) {
          // BUILDS THE JSON OBJECT WITH THE RESULT DATA
          const response = result.map((user) => {
            return {
              userId: user.user_id,
              username: user.username,
              firstName: user.first_name,
              secondName: user.second_name,
              email: user.email,
              userGender: user.user_gender,
              userRole: user.user_role,
              password: user.password,
              salt: user.salt,
              cpf: user.cpf,
              loyalty: user.loyalty,
              address: user.address,
              district: user.district,
              cep: user.cep,
              state: user.state,
            };
          });

          // RETURN THE BUILDED JSON AS RESPONSE
          return res.status(200).send(response);
          next();
        } else {
          res.status(404).send({ msg: "Nenhum usuario encontrado" });
        }
      })
      .catch((error) => {
        res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
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
      const loginParams = [
        userId,
        username,
        email,
        password
      ];
      // CREATE THE INSERTION QUERY FOR THE USERS TABLE
      const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, USER_ROLE, CPF, ADDRESS, ADDRESS_NBR, DISTRICT, CEP, STATE) VALUES(?,?,?,?,?,?,?,?,?, ?,?);`;
          // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      cursor.pool.query(query, userParams, (err, result) => {
        if (err) res.status(404).send({msg : errorHandler(err)});
        else {
          // CREATE THE INSERTION QUERY FOR THE USERS_AUTH TABLE
          const query = `INSERT INTO USERS_AUTH(USER_ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ? ,?)`;  
          cursor.pool.query(query, loginParams, (err, result) => {
            if (err) res.status(404).send({msg : errorHandler(err)});
            else {
              res.status(200).send({msg: `Prestador ${firstName} cadastrado com sucesso`});
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
    cursor
      .execute(query, [userId])
      .then((result) => {
        if (result.affectedRows > 0) {
          const response = { msg: "Usuario excluido com sucesso" };
          return res.status(200).send(response);
          next();
        } else {
          res.status(404).send({ msg: "Erro ao excluir Usuario" });
        }
      })
      .catch((error) => {
        res.status(500).send({ msg: error.sqlMessage });
      });
  };

  // UPDATE USER PER USERID
  controller.updateUser = (req, res) => {};

  return controller;
};
