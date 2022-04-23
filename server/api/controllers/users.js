const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const encrypt = require("../services/encrypt");

module.exports = (app) => {
  const cursor = app.get("cursor");
  const controller = {};

  controller.listUsers = (req, res) => {
    // GET ALL INFO OF THE 10 FIRST USERS ON THE TABLE
    const query = "SELECT * FROM USERS LIMIT 10;";
    // CALL THE EXECUTE PASSING THE QUERY
    cursor
      .execute(query)
      .then((result) => {
        if (result.length > 0) {
          // BUILDS THE JSON OBJECT WITH THE RESULT DATA
          const response = {
            users: result.map((user) => {
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
              };
            }),
          };
          // RETURN THE BUILDED JSON AS RESPONSE
          return res.status(200).send(response);
          next();
        } else {
          res.status(404).send({ msg: "Nenhum usuario cadastrado" });
        }
      })
      .catch((error) => {
        res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
      });
  };

  controller.listWorkers = (req, res) => {
    // GET ALL INFO OF THE 10 FIRST WORKERS ON THE TABLE
    const query = "SELECT * FROM USERS A WHERE A.USER_ROLE = 1 LIMIT 10;";
    // CALL THE EXECUTE PASSING THE QUERY
    cursor
      .execute(query)
      .then((result) => {
        if (result.length > 0) {
          // BUILDS THE JSON OBJECT WITH THE RESULT DATA
          const response = {
            users: result.map((user) => {
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
              };
            }),
          };
          // RETURN THE BUILDED JSON AS RESPONSE
          return res.status(200).send(response);
          next();
        } else {
          res.status(404).send({ msg: "Nenhum usuario cadastrado" });
        }
      })
      .catch((error) => {
        res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
      });
  };

  controller.listClients = (req, res) => {
    // GET USERS WITH userRole as 2(CLIENT) AND THEIR RESPECTIVE PETS BY THE owner_ID BEING THE SAME AS THE user_ID
    const query =
      "SELECT * FROM USERS A, PETS B WHERE A.USER_ROLE = 2 AND A.USER_ID = B.OWNER_ID;";
    cursor
      .execute(query)
      .then((result) => {
        if (result.length > 0) {
          // PUT THE USER PET INTO A ARRAY OF OBJECTS
          const pets = result.map((user) => {
            return {
              petId: user.pet_id,
              petName: user.pet_name,
              petType: user.pet_type,
              petBreed: user.pet_breed,
            };
          });

          // CREATE A RESPONSE TO SEND
          // GET THE RESULT(PETS) FROM THE QUERY ABOVE AND MERGE WITH THE USER DATA
          const response = {
            users: result.map((user) => {
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
                pets: pets,
              };
            }),
          };

          // RETURNS THE JSON AS RESPONSE
          return res.status(200).send(response);
          next();
        } else {
          res.status(404).send({ msg: "Nenhum usuario cadastrado" });
        }
      })
      .catch((error) => {
        res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
      });
  };

  controller.saveUser = async (req, res) => {
    // Setando variavel para verificar o userRole
    let verifyRole = req.body.userRole;

    // Gerar Salt para Encriptar Password
    const salt = await bcrypt.genSalt(10);

    // Setar user.password sendo o password encriptado
    let hashedPass = await encrypt.generatePass(req.body.password, salt);

    // Cadastro de Prestadores
    if (verifyRole === 1) {
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
      } = req.body;

      // CREATE A CONST PARAMS THAT CONTAINS ALL THE REQ.BODY PARAMS FOR THE INSERTION QUERY
      // PASSES A GENERATED UUID FOR THE USER_ID
      const params = [
        uuidV4(),
        username,
        firstName,
        secondName,
        email,
        userGender,
        userRole,
        password,
        cpf,
      ];
      console.log(params);
      // CREATE THE INSERTION QUERY
      const query = "INSERT INTO USERS(USER_ID, USERNAME, FIRST_NAME, SECOND_NAME, EMAIL, USER_GENDER, USER_ROLE, PASSWORD, CPF) VALUES(?,?,?,?,?,?,?,?,?);";
      // CALL THE EXECUTE PASSING THE QUERY
      cursor
        .execute(query, params)
        .then((result) => {
          console.log(result)
          if (result.affectedRows > 0 > 0) {
            const response = { msg: "Prestador cadastrado com sucesso" };
            return res.status(200).send(response);
            next();
          } else {
            res.status(404).send({ msg: "Erro ao cadastrar Prestador" });
          }
        })
        .catch((error) => {
          if(error.code === 'ER_DUP_ENTRY'){
            res.status(500).send({ msg: `Prestador ja possui cadastro` });
          }
        });
    }
    // Cadastro de Clientes
    else if (verifyRole === 2) {
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
      } = req.body;

      // CREATE A CONST PARAMS THAT CONTAINS ALL THE REQ.BODY PARAMS FOR THE INSERTION QUERY
      // PASSES A GENERATED UUID FOR THE USER_ID
      const params = [
        uuidV4(),
        username,
        firstName,
        secondName,
        email,
        userGender,
        userRole,
        password,
        cpf,
      ];
      console.log(params);
      // CREATE THE INSERTION QUERY
      const query = "INSERT INTO USERS(USER_ID, USERNAME, FIRST_NAME, SECOND_NAME, EMAIL, USER_GENDER, USER_ROLE, PASSWORD, CPF) VALUES(?,?,?,?,?,?,?,?,?);";
      // CALL THE EXECUTE PASSING THE QUERY
      cursor
        .execute(query, params)
        .then((result) => {
          console.log(result)
          if (result.affectedRows > 0 > 0) {
            const response = { msg: "Cliente cadastrado com sucesso" };
            return res.status(200).send(response);
            next();
          } else {
            res.status(404).send({ msg: "Erro ao cadastrar Cliente" });
          }
        })
        .catch((error) => {
          if(error.code === 'ER_DUP_ENTRY'){
            res.status(500).send({ msg: `Cliente ja possui cadastro` });
          }
          
        });
    }
  };

  // Remover Usuario por UserID
  controller.removeUser = (req, res) => {
    // Pegando userID dos parametros de requerimento
    const { userId } = req.params;

    // Achar index do usuario X com userID passado
    const foundUserIndex = usersMock.data.findIndex(
      (user) => user.userId === userId
    );

    // Caso Usuario nao exista
    if (foundUserIndex === -1) {
      res.status(404).json({
        message: "Usuario não encontrado na base.",
        success: false,
        users: usersMock,
      });
      // Caso Usuario Exista
    } else {
      // Pegando Usuario do mock e setando na variavel
      let resultUser = usersMock.data.splice(foundUserIndex, 1);
      // Entregando resposta com mensagem de sucesso e usuario que foi deletado
      res.status(201).json({
        message: "Usuario encontrado e deletado com sucesso!",
        success: true,
        users: resultUser,
      });
    }
  };

  // Alterar Usuario por userID
  controller.updateUser = (req, res) => {
    const { userId } = req.params;

    const foundUserIndex = usersMock.data.findIndex(
      (user) => user.userId === userId
    );

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: "Usuario não encontrado na base.",
        success: false,
        users: usersMock,
      });
    } else {
      const newUser = {
        userId: userId,
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        cpf: req.body.cpf,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        isPrestador: req.body.isPrestador,
        isCliente: req.body.isCliente,
        pets: req.body.pets,
      };

      usersMock.data.splice(foundUserIndex, 1, newUser);

      res.status(200).json({
        message: "Usuario encontrado e atualizado com sucesso!",
        success: true,
        users: usersMock,
      });
    }
  };

  return controller;
};
