const { v4: uuidV4 } = require("uuid");

let petsResult = function async(result) {
  if (result.length > 0) {
    // CREATE A JSON RESPONSE TO SEND
    const response = 
    result.map((pet) => {
        return {
          ownerId: pet.OWNER_ID,
          ownerName: pet.FIRST_NAME,
          petId: pet.PET_ID,
          petName: pet.PET_NAME,
          petType: pet.PET_TYPE,
          petBreed: pet.PET_BREED,
        };
      });
    return response;
  } else {
    return [];
  }
};

let errorHandler = function async(error) {
  if (error.errno === 1062) {
    return `Usuario ja cadastrado no sistema`;
  }
};

module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();
  const controller = {};

  let checkPet = async (petId) =>{
    return new Promise((resolve) => { 
      const query = "SELECT A.PET_NAME FROM PETS A WHERE PET_ID = ?;";      
      pool.query(query, petId, (err, result) => {                  
      if (err) { 
        resolve(false);
      } 
      else { 
        if(result.length > 0){
          resolve(true);
        }else{
          resolve(false);
        }
      } 
    })
  })
  }

  let checkUser = async (userId) =>{
    return new Promise((resolve) => { 
      const query = "SELECT A.first_name FROM USERS A WHERE USER_ID = ?;";
      pool.query(query, userId, (err, result) => {                  
      if (err) { 
        resolve(false);
      } 
      else { 
        if(result.length > 0){
          resolve(true);
        }else{
          resolve(false);
        }
      } 
    })
  })
  }

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


  controller.getPetsByUserId = (req, res) => {
    // GET USERID FROM REQ PARAMS
    const { userId } = req.params;
    // GET ALL INFO OF THE USER PER USERID
    const query = 'SELECT A.OWNER_ID, C.FIRST_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.OWNER_ID = ? LIMIT 10;';
    // CALL THE EXECUTE PASSING THE QUERY
    pool.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(404).send("Usuario nao cadastrado");
      } else {
        const response = petsResult(result);
        return res.status(200).send(response);
      }
    });
  };

  controller.getPetsByPetId = (req, res) => {
    const { petId } = req.params;
    const query = 'SELECT A.OWNER_ID, C.FIRST_NAME , A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.PET_ID = ? LIMIT 10;';
    pool.query(query, [petId], (err, result) => {
      if (err) {
        return res.status(404).send("Pet nao cadastrado");
      } else {
        const response = petsResult(result);
        return res.status(200).send(response);
      }
    });
  };



  controller.removePetByPetId = (req, res) => {
    const { petId } = req.params;
    const query = "DELETE FROM PETS WHERE PET_ID = ?;";
    pool.query(query, petId, (err, result) => {
      if (err) res.status(404).send({ msg: errorHandler(err) });
      else {
        if (result.affectedRows === 1) {
          res.status(200).send({ msg: "Pet deletado com sucesso" });
        }
      }
    });
  };

  controller.updatePetByPetId = async (req, res) => {
    const { petId } = req.params;
    if(await checkPet(petId)){
      if (err) res.status(404).send({ msg: errorHandler(err) });
      else {
        if(result.length > 0){
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
              res.status(404).send({ msg: errorHandler(err) })
            }
            else { res.status(201).send({ msg: 'Pet alterado com sucesso' }); }
          });
        }
      }
    }else{
      res.status(404).send({ msg: 'Pet nao encontrado' })
    }
}

  return controller;
};
