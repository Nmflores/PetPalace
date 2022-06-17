const {
  v4: uuidV4
} = require("uuid");



module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

  const { addPetQ, updatePet, deletePet } = app.services.queries
  
  const {
    checkUser,
    checkPet
  } = app.services.checks

  const {
    petsResult,
    errorHandler,
    messages
  } = app.services.output
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

  controller.addPet = async (req, res) => {
    const {
      ownerId,
      petName,
      petType,
      petBreed
    } = req.body;
    if(ownerId && petName && petType && petBreed){
      
    const petId = uuidV4();
    const params = [ownerId, petId, petName, petType, petBreed]

    const result = await addPetQ(params)
    res.status(result.status).json({data: result.data})
    }else{
      res.status(400).send({
        data: "Faltam dados para cadastrar o Pet"
      })
    }
  }


  controller.getPetsByUserId = async (req, res) => {
    // GET USERID FROM REQ PARAMS
    const {
      userId
    } = req.params;
    // GET ALL INFO OF THE USER PER USERID
    if (await checkUser(userId)) {
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME ,A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.OWNER_ID = ? LIMIT 10;';
      // CALL THE EXECUTE PASSING THE QUERY
      pool.query(query, [userId], (err, result) => {
        if (err) {
          res.status(404).send({
            data: err
          });
        } else {
          const response = petsResult(result);
          res.status(200).send(response);
        }
      });
    }

  };

  controller.getPetsByPetId = async (req, res) => {
    const {
      petId
    } = req.params;
    if (await checkPet(petId)) {
      const query = 'SELECT A.OWNER_ID, C.FIRST_NAME , A.PET_ID, A.PET_NAME, B.PET_TYPE, A.PET_BREED FROM PETS A, PET_TYPES B, USERS C WHERE A.PET_TYPE = B.PET_TYPE_ID AND A.OWNER_ID = C.USER_ID AND A.PET_ID = ? LIMIT 10;';
      pool.query(query, [petId], (err, result) => {
        if (err) {
          return res.status(404).send({
            data: errorHandler(err)
          });
        } else {
          const response = petsResult(result);
          return res.status(200).send({
            data: response
          });
        }
      })
    } else {
      return res.status(200).send({
        data: messages(2)
      });
    }
  }



  controller.updatePetByPetId = async (req, res) => {
    const {
      petId
    } = req.params;
    const {
      petName,
      petType,
      petBreed
    } = req.body;

    const petParams = [
      petName, petType, petBreed, petId
    ]

    if(petName && petType && petBreed){
      if (await checkPet(petId)) {
        //IF EXISTS
        // GET THE RESULT OF THE SERVICES.QUEUE UPDATE PET FUNCTION      
        const result = await updatePet(petId, petParams)
        // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
        res.status(result.status).json({
          data: result.data
        })
      } else {
        res.status(400).send({
          data: messages(2)
        })
      }
    }else{
      res.status(400).send({
        data: "Faltam dados para atualizar o Pet"
      })
    }

  }

  

  controller.removePetByPetId = async (req, res) => {
    const {
      petId
    } = req.params;
    if (await checkPet(petId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE DELETE PET FUNCTION      
      const result = await deletePet(petId)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      res.status(400).send({
        data: messages(2)
      })
    }
  }


  return controller;
}