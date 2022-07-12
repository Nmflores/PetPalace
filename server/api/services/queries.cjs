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



  services.logIn = async (email, password) => {
    return new Promise((resolve) => {
      const query =
        "SELECT A.USER_ID FROM USERS A WHERE A.EMAIL = ? AND A.PASSWORD = ?;";
      pool.query(query, [email, password], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err,
            isLogged: false
          })
        } else {
          if (result.length > 0) {
            //CREATES JWT WITH USER_ID 
            //const accessToken = createAccessToken(result)
            resolve({
              status: 200,
              accessToken: result[0].USER_ID,
              data: "Logado com sucesso 😊 👌",
              isLogged: true
            })

          } else {
            resolve({
              status: 400,
              data: "Credenciais de Login incorretas, tente novamente",
              isLogged: false
            })
          }
        }
      })

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
    return new Promise((resolve) => {
      const query = "SELECT * FROM USERS A WHERE A.USER_ID = ?;";
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          resolve({
            status: 200,
            data: usersResult(result)
          })
        }
      })

    })
  }

  services.updateUserQ = async (userId, userParams) => {
    return new Promise((resolve) => {
      // CREATE THE UPDATE QUERY FOR THE USERS TABLE
      const query = `UPDATE USERS SET first_name = ?,second_name = ?,
      user_gender = ?,
      contact_nbr = ?, 
      cpf = ?,
      state = ? WHERE USER_ID = ?;`;
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, userParams, (err, result) => {
        if (err) resolve({
          status: 400,
          data: err
        })
        else resolve({
          status: 201,
          data: 'Usuario alterado com sucesso'
        })
      })
    })
  }

  services.deleteUser = async (userId) => {
    return new Promise((resolve) => {
      const query = "DELETE FROM USERS WHERE USER_ID = ?;";
      pool.query(query, userId, (err, result) => {
        if (err) {
          resolve({
            status: 400,
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
    })
  }



  services.getWorkers = async () => {
    return new Promise((resolve) => {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name, B.price, A.contact_nbr FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id;";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: workersResult(result)
            })
          } else {
            resolve({
              status: 200,
              data: []
            })
          }
        }
      })
    })
  }

  services.getPetTypesForWorkerId = async function (userId, serviceId) {
    return new Promise((resolve) => {
      const query = `SELECT PET_TYPE_ID, SERVICE_ID FROM SERVICE_PET_TYPES WHERE WORKER_ID = ? AND SERVICE_ID = ?`
      pool.query(query, [userId, serviceId], (err, result) => {
        if (err) {
          resolve(err)
        } else {
          if (result.length > 0) {
            let output = []
            result.forEach(elem => {
              if (!output.includes(elem)) {
                output.push(elem)
              }
            })
            resolve(output)
          }
        }
      })

    })
  }

  services.getWorkersByUserId = async (userId) => {
    //console.log(await services.getPetTypesForWorkerId(userId, 3))
    return new Promise((resolve => {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name, B.price FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND A.user_id = ?;";
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.length > 0) {
            //result.forEach(async (elem) => {
            //  elem.petTypes = await services.getPetTypes(userId, elem.service_id)
            //  console.log(`petTypes: ${elem.petTypes}`)})
            resolve({
              status: 200,
              data: workersResult(result)
            })
          } else {
            resolve({
              status: 200,
              data: []
            })
          }
        }
      })
    }))
  }


  services.getWorkersByServiceId = async (serviceId) => {
    return new Promise((resolve => {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, B.service_id, C.service_name, B.price FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND B.service_id = ?;";

      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, serviceId, (err, result) => {
        if (err) {
          if (err.code === "ECONNREFUSED") resolve({
            status: 400,
            data: "Banco de dados inacessivel"
          })
        } else {
          if (result.length > 0) resolve({
            status: 200,
            data: workersResult(result)
          })
          else resolve({
            status: 200,
            data: []
          })
        }
      })
    }))
  }

  services.registerPetTypesForService = async (userId, petTypes) => {
    return new Promise((resolve) => {
      const query = "INSERT INTO SERVICE_PET_TYPES(WORKER_ID, PET_TYPE_ID) VALUES(?, ?);";
      for (let x in petTypes) {
        pool.query(query, [userId, petTypes[x].petType], (err, result) => {
          if (err) {
            resolve(false)
          } else {
            if (result.length > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      }
    })
  }

  services.registerWorker = async (userId, serviceId, price, petTypes) => {
    const callRegisterPetTypes = await services.registerPetTypesForService(userId, petTypes)

    const checkBefore = await checkUser(userId)
    return new Promise((resolve) => {
      if (checkBefore) {
        // GET ALL WORKS AND USER INFO
        const query =
          "INSERT INTO WORKER_SERVICES(USER_ID, SERVICE_ID, PRICE) VALUES(?,?, ?);";
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        pool.query(query, [userId, serviceId, price], (err, result) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              resolve({
                status: 400,
                data: "Serviço já cadastrado para este Usuario"
              })
            } else if (err.code === "ECONNREFUSED") {
              resolve({
                status: 400,
                data: "Banco de dados inacessivel"
              })
            }
          } else {
            if (result.affectedRows > 0) {
              callRegisterPetTypes()
            } else {
              resolve({
                status: 400,
                data: 'Cadastro de serviço falhou'
              })
            }
          }
        })
      } else {
        resolve({
          status: 400,
          data: "Nenhum Usuario Cadastrado com este ID"
        })
      }

    })
  }

  services.updateWorkPrice = async (userId, serviceId, price) => {
    return new Promise((resolve) => {
      // CREATE THE UPDATE QUERY FOR THE WORKER_SERVICES TABLE
      const query = `UPDATE WORKER_SERVICES SET PRICE = ? WHERE USER_ID = ? AND SERVICE_ID = ?;`;
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, [price, userId, serviceId], (err, result) => {
        if (err) resolve({
          status: 400,
          data: err
        })
        else resolve({
          status: 201,
          data: 'Preço de serviço alterado com sucesso'
        })
      })
    })
  }

  services.deleteAvailableWorker = async (userId, serviceId) => {
    return new Promise((resolve) => {

      const query =
        "DELETE FROM WORKER_SERVICES WHERE USER_ID = ? AND SERVICE_ID = ?;";
      pool.query(query, [userId, serviceId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: "Serviço de Prestador deletado com sucesso"
            })
          } else {
            resolve({
              status: 400,
              data: "Erro ao deletar serviço de Prestador"
            })
          }
        }
      })
    })
  }


  services.createContract = async (params) => {
    return new Promise((resolve) => {
      const query =
        "INSERT INTO SERVICES_QUEUE(QUEUE_ID, WORKER_ID, OWNER_ID, SERVICE_ID, PRICE) VALUES(?);";
      pool.query(query, [params], (err, result) => {
        if (err) {
          if (err.code === "ECONNREFUSED") {
            resolve({
              status: 400,
              data: "Banco de dados inacessivel"
            })
          } else if (err.sqlMessage.includes('QUEUE_ID')) {
            resolve({
              status: 400,
              data: "Contrato com este ID ja esta registrado"
            })
          }

        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Contrato de serviço cadastrado com sucesso'
            })
          } else {
            resolve({
              status: 400,
              data: 'Erro ao cadastrar Contrato de serviço'
            })
          }
        }
      })

    })
  }

  services.getFullName = async function (userId) {
    function titleize(text) {
      var loweredText = text.toLowerCase();
      var words = loweredText.split(" ");
      for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1)

        words[a] = w;
      }
      return words.join(" ");
    }
    return new Promise((resolve) => {
      const query = `SELECT FIRST_NAME, SECOND_NAME FROM USERS WHERE USER_ID = ?;`
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve(err)
        } else {
          if (result.length > 0) {
            let firstName = titleize(result[0].FIRST_NAME)
            let secondName = titleize(result[0].SECOND_NAME)
            let fullName = `${firstName} ${secondName}`
            //console.log(fullName)
            resolve(fullName)
          }
        }
      })

    })
  }

  services.getQueues = async () => {
    return new Promise((resolve) => {
      const query =
        "SELECT A.*, B.service_name as 'serviceName' FROM SERVICES_QUEUE A, AVAILABLE_SERVICES B WHERE A.service_id = B.service_id;"
      pool.query(query, [], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: []
          })
        } else {
          if (result.length > 0) {
            result.forEach(async (elem) => {
              elem.workerName = await services.getFullName(elem.worker_id)
              elem.ownerName = await services.getFullName(elem.owner_id)
              //console.log(`worker_id: ${elem.worker_id}\n owner_id: ${elem.owner_id}`)
              console.log(`workerName: ${elem.workerName}\n ownerName: ${elem.ownerName}`)
            })
            console.log(result)
            setTimeout(() => {
              resolve({
                status: 201,
                data: result
              })
            }, 500)
          } else {
            resolve({
              status: 400,
              data: []
            })
          }
        }
      })
    })
  }

  services.getNumber = async function (userId) {
    return new Promise((resolve) => {
      const query = `SELECT CONTACT_NBR FROM USERS WHERE USER_ID = ?;`
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve(err)
        } else {
          if (result.length > 0) {
            resolve(result[0].CONTACT_NBR)
          }
        }
      })
    })
  }


  services.getQueuesByUserId = async (userId) => {
    return new Promise((resolve) => {
      let output = []
      const query =
        "SELECT A.*, B.service_name as 'serviceName' FROM SERVICES_QUEUE A, AVAILABLE_SERVICES B WHERE A.service_id = B.service_id AND A.WORKER_ID = ?;"
      pool.query(query, [userId], (err, result1) => {
        if (err) {
          console.log(err)
          resolve({
            status: 400,
            data: []
          })
        } else {
          console.log("result1", result1)
          result1.forEach(async (elem) => {
            elem.workerName = await services.getFullName(elem.worker_id)
            elem.ownerName = await services.getFullName(elem.owner_id)
            elem.workerContactNumber = await services.getNumber(elem.worker_id)
            elem.ownerContactNumber = await services.getNumber(elem.owner_id)
          })
          const query =
            "SELECT A.*, B.service_name as 'serviceName' FROM SERVICES_QUEUE A, AVAILABLE_SERVICES B WHERE A.service_id = B.service_id AND A.OWNER_ID = ?;"
          pool.query(query, [userId], (err, result) => {
            if (err) {
              console.log(err)
              resolve({
                status: 400,
                data: []
              })
            } else {
              result.forEach(async (elem) => {
                elem.workerName = await services.getFullName(elem.worker_id)
                elem.ownerName = await services.getFullName(elem.owner_id)
                elem.workerContactNumber = await services.getNumber(elem.worker_id)
                elem.ownerContactNumber = await services.getNumber(elem.owner_id)
              })
              output = [...result1, ...result]
              console.log("result2", result)
              console.log("output", output)
              if (output.length > 0) {
                setTimeout(() => {
                  resolve({
                    status: 200,
                    data: output
                  })
                }, 2000)
              } else {
                resolve({
                  status: 200,
                  data: []
                })
              }
            }
          })
        }
      })
    })
  }

  services.deleteContractByQueueId = async (queueId) => {
    return new Promise((resolve) => {
      const query =
        "DELETE FROM SERVICES_QUEUE WHERE QUEUE_ID = ?;";
      pool.query(query, [queueId], (err, result) => {
        if (err) {
          if (err.code === "ECONNREFUSED") {
            resolve({
              status: 500,
              data: "Banco de dados inacessivel"
            })
          } else if (err.sqlMessage.includes('QUEUE_ID')) {
            resolve({
              status: 500,
              data: "Contrato com este ID ja esta registrado"
            })
          }
        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Contrato de serviço deletado com sucesso'
            })
          } else {
            resolve({
              status: 500,
              data: 'Erro ao deletar Contrato de serviço'
            })
          }
        }
      })

    })
  }

  services.updateContractStatus = async (queueId, status) => {
    // STATUS : 0 - DEFAULT, SIGNIFICA NA FILA
    // STATUS : 1 - SIGNIFICA ACEITO
    // STATUS : 2 - SIGNIFICA TERMINADO, DEVE SER SETADO END_DATE COMO DATE.NOW
    // STATUS : 3 - SIGNIFICA REJEITADO, DEVE SER SETADO END_DATE COMO DATE.NOW

    return new Promise((resolve) => {
      let query = ""
      if (status === 1) {
        query =
          "UPDATE services_queue SET status = 1 WHERE queue_id = ?;"
      }
      if (status === 2) {
        query =
          "UPDATE services_queue SET status = 2 , end_date = CURRENT_DATE WHERE queue_id = ?"
      }
      if (status === 3) {
        query =
          "UPDATE services_queue SET status = 3 , end_date = CURRENT_DATE WHERE queue_id = ?"
      }
      pool.query(query, [queueId], (err, result) => {
        if (err) {
          if (err.code === "ECONNREFUSED") {
            resolve({
              status: 500,
              data: "Banco de dados inacessivel"
            })
          }

        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Status de serviço alterado com sucesso'
            })
          } else {
            resolve({
              status: 500,
              data: 'Erro ao alterar Status do Contrato de serviço'
            })
          }
        }
      })

    })
  }

  services.updateContractPrice = async (queueId, price) => {
    return new Promise((resolve) => {
      const query = "UPDATE SERVICES_QUEUE SET PRICE = ? WHERE QUEUE_ID = ?;";
      pool.query(query, [price, queueId], (err, result) => {
        if (err) {
          if (err.code === "ECONNREFUSED") {
            resolve({
              status: 500,
              data: "Banco de dados inacessivel"
            })
          }
        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Preço de serviço alterado com sucesso'
            })
          } else {
            resolve({
              status: 500,
              data: 'Erro ao alterar Preço do serviço'
            })
          }
        }
      })
    })
  }





  //NEED TO CERTIFY THAT THE LOYALTY SYSTEM IS REGISTERING AUTOMATICALY FOR ALL NEW USERS
  //NEED TO MAKE A NEW USER TO CERTIFY THAT
  //DONE, WORKING GREAT
  services.createLoyalty = async (userId) => {
    return new Promise((resolve) => {
      const query = "INSERT INTO LOYALTY(USER_ID) VALUES(?);";
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve(false)
        } else {
          if (result.affectedRows > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })


    })
  }


  services.getActualRating = async (userId) => {
    return new Promise((resolve) => {
      const query = "SELECT ACTUAL_RATING FROM LOYALTY WHERE USER_ID = ?;"
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve(false)
        } else {
          resolve(result[0].ACTUAL_RATING)
        }
      })
    })
  }

  services.checkUserRatingOutputQuery = function (rating) {
    let query = ""
    if (rating >= 10) {
      query = `UPDATE USERS SET LOYALTY = 1 WHERE USER_ID = ?;`
      if (rating >= 15) {
        query = `UPDATE USERS SET LOYALTY = 2 WHERE USER_ID = ?;`
        if (rating >= 25) {
          query = `UPDATE USERS SET LOYALTY = 3 WHERE USER_ID = ?;`
          if (rating >= 35) {
            query = `UPDATE USERS SET LOYALTY = 4 WHERE USER_ID = ?;`
            if (rating >= 45) {
              query = `UPDATE USERS SET LOYALTY = 5 WHERE USER_ID = ?;`
            }
          }
        }
      }
    }
    return query
  }

  //LOYALTY SYSTEM
  //LVL 0 TO 1 -- NEEDS 10 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 1 TO 2 -- NEEDS 15 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 2 TO 3 -- NEEDS 25 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 3 TO 4 -- NEEDS 35 TOTAL STARS OF RATING ON THE FEEDBACKS
  //LVL 4 TO 5 -- NEEDS 45 TOTAL STARS OF RATING ON THE FEEDBACKS 

  services.updateUserLoyaltyLevel = async (workerId, ownerId) => {
    const updateInfo = async (query, userId) => {
      pool.query(query, [userId], (err, result) => {
        if (err) {
          return false
        } else {
          if (result.affectedRows > 0) {
            return true
          }
        }
      })
    }

    const workerRating = await services.getActualRating(workerId)
    const workerQuery = await services.checkUserRatingOutputQuery(workerRating)

    const ownerRating = await services.getActualRating(ownerId)
    const ownerQuery = await services.checkUserRatingOutputQuery(ownerRating)

    const callFunction = async (userQuery, userId) => {
      await updateInfo(userQuery, userId)
    }
    callFunction(workerQuery, workerId)
    callFunction(ownerQuery, ownerId)
  }



  //UPDATES THE LOYALTY OF THE USER_ID ON THE LOYALTY TABLE
  services.updateLoyalty = async (userId, plusFactor) => {
    return new Promise((resolve) => {
      if (plusFactor > 1 && plusFactor <= 5) {
        let ratingSum = plusFactor;

        const query = "SELECT ACTUAL_RATING FROM LOYALTY WHERE USER_ID = ?;"
        pool.query(query, [userId], (err, result) => {
          if (err) {
            resolve(false)
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


  services.getFeedbacksQ = async () => {
    return new Promise((resolve) => {

      const query =
        "SELECT * FROM USERS_FEEDBACK;";
      pool.query(query, [], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: result
            })
          } else {
            resolve({
              status: 400,
              data: 'Nenhum feedback cadastrado'
            })
          }
        }
      })
    })
  }

  services.getFeedbackByQueueId = async (queueId) => {
    return new Promise((resolve) => {
      const query =
        "SELECT * FROM USERS_FEEDBACK WHERE QUEUE_ID = ?;";
      pool.query(query, [queueId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: result
            })
          } else {
            resolve({
              status: 400,
              data: 'Nenhum feedback cadastradopara este Contrato'
            })
          }
        }
      })
    })
  }

  services.deleteFeedback = async (queueId) => {
    return new Promise((resolve) => {
      const query =
        "DELETE FROM USERS_FEEDBACK WHERE QUEUE_ID = ?;";
      pool.query(query, [queueId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Feedback deletado com sucesso'
            })
          } else {
            resolve({
              status: 400,
              data: 'Feedback não foi deletado'
            })
          }
        }

      })
    })
  }



  services.addPetQ = async (params) => {
    return new Promise((resolve) => {
      const query =
        "INSERT INTO PETS(OWNER_ID, PET_ID, PET_NAME, PET_TYPE, PET_BREED) VALUES(?, ? , ? , ?, ?);";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      pool.query(query, params, (err, result) => {
        if (err) resolve({
          status: 400,
          data: err
        })
        else {
          if (result.affectedRows > 0) {
            resolve({
              status: 200,
              data: 'Pet adicionado com sucesso'
            })

          }
        }
      })

    })
  }

  services.getPets = async () => {
    return new Promise((resolve) => {
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME, C.SECOND_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID LIMIT 10;';
      pool.query(query, (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: result
            })
          } else {
            resolve({
              status: 200,
              data: []
            })
          }
        }
      })
    })
  }


  services.getPetsByUserIdQ = async (userId) => {
    return new Promise((resolve) => {
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.OWNER_ID = ? LIMIT 10;';
      // CALL THE EXECUTE PASSING THE QUERY
      pool.query(query, [userId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          });
        } else {
          if (result.length > 0) {
            resolve({
              status: 200,
              data: result
            })
          } else {
            resolve({
              status: 200,
              data: []
            })
          }
        }
      })
    })
  }


  services.getPetByPetIdQ = async (petId) => {
    return new Promise((resolve) => {
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME , A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.PET_ID = ? LIMIT 10;';
      pool.query(query, [petId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          });
        } else {
          resolve({
            status: 200,
            data: result
          })
        }
      })
    })
  }




  services.updatePet = async (petId, petParams) => {
    return new Promise((resolve) => {
      const query = `UPDATE PETS SET PET_NAME = ?, PET_TYPE = ?,
      PET_BREED = ? WHERE PET_ID = ?;`;
      pool.query(query, petParams, (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.affectedRows > 0) {
            resolve({
              status: 201,
              data: 'Pet alterado com sucesso'
            })
          }
        }
      })
    })
  }

  services.deletePet = async (petId) => {
    return new Promise((resolve) => {
      const query = "DELETE FROM PETS WHERE PET_ID = ?;";
      pool.query(query, [petId], (err, result) => {
        if (err) {
          resolve({
            status: 400,
            data: err
          })
        } else {
          if (result.affectedRows === 1) {
            resolve({
              status: 400,
              data: "Pet deletado com sucesso"
            })
          }
        }
      })
    })
  }



  return services;
}