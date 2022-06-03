module.exports = app => {
  const services = {};
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

  const {
    messages,
    usersResult,
    workersResult
  } = app.services.output;

  const {
    createAccessToken
  } = app.services.accessToken;

  const {
    checkUser
  } = app.services.checks

  services.registerUser = async (userId, userParams, loginParams) => {
    return new Promise((resolve) => {
      const query = `INSERT INTO USERS(USER_ID, FIRST_NAME, SECOND_NAME, USER_GENDER, CPF, ADDRESS, ADDRESS_NBR, DISTRICT, CEP, STATE) VALUES(?,?,?,?,?,?,?,?,?,?);`;
      pool.query(query, userParams, (err, result) => {
        if (err) {
          if (err.sqlMessage.includes('cpf')) {
            resolve({
              status: 500,
              data: 'Usuario com este CPF ja esta cadastrado'
            })
          } else if (err.sqlMessage.includes('user_id')) {
            resolve({
              status: 500,
              data: 'Usuario com este ID ja esta cadastrado'
            })
          }
        } else {
          if (result.affectedRows > 0) {
            services.registerUserAuth(userId, loginParams)
          } else {
            resolve({
              status: 500,
              data: "Cadastro de Usuario falhou"
            })
          }
        }
      })
    })
  }


  services.registerUserAuth = async (userId, loginParams) => {
    return new Promise((resolve) => {
      const query = `INSERT INTO USERS_AUTH(USER_ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ? ,?)`;
      pool.query(query, loginParams, (err, result) => {
        if (err) {
          if (err.sqlMessage.includes('username')) {
            resolve({
              status: 500,
              data: 'Usuario com este Username já esta cadastrado'
            })
          } else if (err.sqlMessage.includes('email')) {
            resolve({
              status: 500,
              data: 'Usuario com este email já esta cadastrado'
            })
          }

        } else {
          if (result.affectedRows > 0) {
            if (services.createLoyalty(userId)) {
              resolve({
                status: 201,
                data: "Usuario cadastrado com sucesso"
              })
            } else {
              resolve({
                status: 500,
                data: "Cadastro de lealdade falhou"
              })
            }
          } else {
            resolve({
              status: 500,
              data: "Cadastro de Usuario falhou"
            })
          }
        }
      })
    })
  }

  services.logIn = async (username, password) => {
    return new Promise((resolve) => {
      const query =
        "SELECT A.USER_ID FROM USERS_AUTH A WHERE A.USERNAME = ? AND A.PASSWORD = ?;";
      pool.query(query, [username, password], (err, result) => {
        if (err) {
          resolve({
            status: 500,
            data: err,
            isLogged: false
          })
        } else {
          if (result.length > 0) {
            //CREATES JWT WITH USER_ID 
            const accessToken = createAccessToken(result)
            resolve({
              status: 200,
              data: accessToken,
              isLogged: true
            })

          } else {
            resolve({
              status: 500,
              data: "Credenciais de Login incorretas, tente novamente",
              isLogged: false
            })
          }
        }
      });

    })
  }


  services.getUsers = async () => {
    return new Promise((resolve) => {
      // GET ALL INFO OF THE 10 FIRST USERS ON THE TABLE
      const query = "SELECT * FROM USERS;";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, (err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: result
            })
          } else {
            resolve({
              status: 200,
              data: "Nenhum Usuario Cadastrado"
            })
          }
        }
      })
    })
  }


  services.getUserByUserId = async (userId) => {
    const checkBefore = await checkUser(userId)
    return new Promise((resolve) => {
      if (checkBefore) {
        const query = "SELECT * FROM USERS A WHERE A.USER_ID = ?;";
        pool.query(query, [userId], (err, result) => {
          if (err) {
            resolve({
              status: 500,
              data: err
            })
          } else {
            resolve({
              status: 200,
              data: usersResult(result)
            })
          }
        })
      } else resolve({
        status: 500,
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    })
  }

  services.updateUserQ = async (userId, userParams) => {
    const checkBefore = await checkUser(userId)
    return new Promise((resolve) => {
      if (checkBefore) {
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
          if (err) resolve({
            status: 500,
            data: err
          })
          else resolve({
            status: 201,
            data: 'Usuario alterado com sucesso'
          })
        })
      } else resolve({
        status: 500,
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    })
  }

  services.deleteUser = async (userId) => {
    const checkBefore = await checkUser(userId)
    return new Promise((resolve) => {
      if (checkBefore) {
        const query = "DELETE FROM USERS WHERE USER_ID = ?;";
        pool.query(query, userId, (err, result) => {
          if (err) {
            resolve({
              status: 500,
              data: err
            })
          } else {
            if (result.affectedRows === 1) resolve({
              status: 201,
              data: "Usuario deletado com sucesso"
            })
            else resolve({
              status: 500,
              data: "Erro ao deletar Usuario"
            })
          }
        })

      } else {
        resolve({
          status: 500,
          data: "Nenhum Usuario Cadastrado com este ID"
        })
      }
    })
  }

  services.getWorkers = async () => {
    return new Promise((resolve) => {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id;";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, (err, result) => {
        if (err) resolve({
          status: 500,
          data: err
        })
        else resolve({
          status: 200,
          data: workersResult(result)
        })
      });
    })
  }

  services.getWorkersByUserId = async (userId) => {
    return new Promise((resolve => {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND A.user_id = ?;";
      pool.query(query, [userId], (err, result) => {
        if (err) resolve({
          status: 500,
          data: err
        })
        else resolve({
          status: 200,
          data: workersResult(result)
        })
      })
    }))
  }


  services.getWorkersByServiceId = async (serviceId) => {
    return new Promise((resolve => {
        const query =
          "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND B.service_id = ?;";

        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        pool.query(query, serviceId, (err, result) => {
          if (err){
            if(err.code === "ECONNREFUSED") resolve({status: 500, data: "Banco de dados inacessivel"})
          }else {
            if (result.length > 0) resolve({
              status: 200,
              data: workersResult(result)
            })
            else resolve({
              status: 500,
              data: `Serviço de Id:[${serviceId}] nao possui Prestadores`
            })
          }
        })
    }))
  }


  services.registerWork = async (userId, serviceId) =>{
    const checkBefore = await checkUser(userId)
    return new Promise((resolve) => {
      if (checkBefore) {
        // GET ALL WORKS AND USER INFO
        const query =
          "INSERT INTO WORKER_SERVICES(USER_ID, SERVICE_ID) VALUES(?,?);";
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        pool.query(query, [userId, serviceId], (err, result) => {
          if (err){
            if(err.code === "ER_DUP_ENTRY")  resolve({status: 500, data: "Serviço já cadastrado para este Usuario"})
            else if(err.code === "ECONNREFUSED") resolve({status: 500, data: "Banco de dados inacessivel"})
          }
          else {
            if (result.affectedRows > 0) resolve({status: 200, data: "Serviço cadastrado para o Usuario"})
            else resolve({status: 500, data: 'Cadastro de serviço falhou'})
            }
        })
      } else resolve({status: 500, data: "Nenhum Usuario Cadastrado com este ID" })
      
    })
  }














  services.registerPetTypesForContract = async (queueId, petTypes) => {
    return new Promise((resolve) => {
      const query = "INSERT INTO QUEUE_PET_TYPES(QUEUE_ID, PET_TYPE_ID) VALUES(?, ?);";

      for (let x in petTypes) {
        pool.query(query, [queueId, petTypes[x].petType], (err, result) => {
          if (err) {
            resolve(false);
          } else {
            if (result.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        })
      }

    })
  }

  services.createLoyalty = async (userId) => {
    return new Promise((resolve) => {
      const query = "INSERT INTO LOYALTY(USER_ID) VALUES(?);";

      pool.query(query, [userId], (err, result) => {
        if (err) {
          console.log(err)
          resolve(false);
        } else {
          if (result.affectedRows > 0) {
            console.log("loyalty created")
            resolve(true);
          } else {
            resolve(false);
          }
        }
      })


    })
  }


  //NEED TO CERTIFY THAT THE LOYALTY SYSTEM IS REGISTERING AUTOMATICALY FOR ALL NEW USERS
  //NEED TO MAKE A NEW USER TO CERTIFY THAT
  //DONE, WORKING GREAT

  //LOYALTY SYSTEM
  //LVL 0 TO 1 -- NEEDS 10 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 1 TO 2 -- NEEDS 15 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 2 TO 3 -- NEEDS 25 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 3 TO 4 -- NEEDS 35 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 4 TO 5 -- NEEDS 25 TOTAL STARS OF RATING ON THE FEEDBACKS 
  // HOW TO PROCEED ??? 2 OPTIONS
  // 1 -- 
  // NEED TO CREATE DATABASE PROCEDURE TO GET OWNER_ID AND WORKER_ID AS TWO MAIN VARIABLES
  // FOR EACH TIME A NEW FEEDBACK IS MADE
  // COMPARE EACH VARIABLES WITH THE LOYALTY TABLE
  // SUM THE RECEIVED ON THE FEEDBACK RATING ON THE ACTUAL RATING, UPDATING THE LAST UPDATED AT AND THE LAST RATING VALUE.
  // 2 --
  // MAKE A MICROSERVICE TO MAKE ALL THE PROCEDURE OF ABOVE, MAYBE HARDER
  services.updateLoyalty = async (userId, plusFactor) => {
    return new Promise((resolve) => {
      if (plusFactor <= 5) {
        let ratingSum = plusFactor;

        const query = "SELECT ACTUAL_RATING FROM LOYALTY WHERE USER_ID = ?;";
        pool.query(query, [userId], (err, result) => {
          if (err) {
            console.log(err)
          } else {
            if (result.length > 0) {
              let lastRating = result[0].ACTUAL_RATING
              ratingSum += result[0].ACTUAL_RATING
              const query = `UPDATE LOYALTY SET ACTUAL_RATING = ?, LAST_RATING = ?, LAST_UPDATED_AT = NOW() WHERE USER_ID = ?;`
              const params = [ratingSum, lastRating, userId]
              pool.query(query, params, (err, result) => {
                if (err) {
                  resolve(false)
                } else {
                  if (result.affectedRows > 0) {
                    resolve(true)
                  }
                }
              })
            } else {
              resolve(false)

            }
          }
        })
      } else {
        resolve(false)

      }
    })
  }

  return services;
}