const { v4: uuidV4 } = require("uuid");



module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();
  const { checkUser, checkPet } = app.services.checks
  const { petsResult, errorHandler, messages } = app.services.output
  const controller = {};


  controller.listPets = async (req, res) => {
    const query = 'SELECT A.OWNER_ID, C.FIRST_NAME, C.SECOND_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID LIMIT 10;';
    pool.query(query, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const response = petsResult(result);
        res.status(200).send(response);
      }
    });
  };

  controller.addPet = (req, res) => {
    const { ownerId, petName, petType, petBreed } = req.body;
    const petId = uuidV4();
      const query =
      "INSERT INTO PETS(OWNER_ID, PET_ID, PET_NAME, PET_TYPE, PET_BREED) VALUES(?, ? , ? , ?, ?);";
    const params = [ownerId, petId, petName, petType, petBreed]
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    pool.query(query, params, (err, result) => {
      if (err) res.status(404).send(err);
      else {
        if(result.affectedRows > 0){
          res.status(200).send({msg : 'Pet adicionado com sucesso' });
        }
      }
    });
    
  };


  controller.getPetsByUserId = async (req, res) => {
    // GET USERID FROM REQ PARAMS
    const { userId } = req.params;
    // GET ALL INFO OF THE USER PER USERID
    if(await checkUser(userId)){
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.OWNER_ID = ? LIMIT 10;';
    // CALL THE EXECUTE PASSING THE QUERY
    pool.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(404).send({msg : errorHandler(err)});
      } else {
        const response = petsResult(result);
        return res.status(200).send(response);
      }
    });
    }

  };

  controller.getPetsByPetId = async (req, res) => {
    const { petId } = req.params;
    if(await checkPet(petId)){
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME , A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.PET_ID = ? LIMIT 10;';
      pool.query(query, [petId], (err, result) => {
      if (err) {
        return res.status(404).send({data: errorHandler(err)});
      } else {
        const response = petsResult(result);
        return res.status(200).send({data: response});
      }
    })
    }else{
      return res.status(200).send({data: "Pet não existe"});  
    }
  }



  controller.removePetByPetId = async (req, res) => {
    const { petId } = req.params;
    if(await checkPet(petId)){
      const query = "DELETE FROM PETS WHERE PET_ID = ?;";
      pool.query(query, petId, (err, result) => {
        if (err) res.status(404).send({ msg: errorHandler(err) });
        else {
          if (result.affectedRows === 1) {
            res.status(201).send({ data: "Pet deletado com sucesso" });
          }
        }
      }); 
    }else{
      res.status(400).send({ data: messages(2) });
    }
  };

  controller.updatePetByPetId = async (req, res) => {
    const { petId } = req.params;
    if(await checkPet(petId)){
          const {
              petName, petType, petBreed 
          } = req.body;
      
          const petParams = [
            petName, petType, petBreed, petId
          ];
      
          const query = `UPDATE PETS SET PET_NAME = ?, PET_TYPE = ?,
          PET_BREED = ? WHERE PET_ID = ?;`;
          pool.query(query, petParams, (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).send({ data: errorHandler(err) })
            }
            else { res.status(201).send({ data: 'Pet alterado com sucesso' }); }
          })
        }
      }



  return controller;
}
