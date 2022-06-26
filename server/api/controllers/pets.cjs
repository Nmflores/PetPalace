const {
  v4: uuidV4
} = require("uuid");



module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

  const {
    addPetQ,
    getPets,
    getPetsByUserIdQ,
    getPetByPetIdQ,
    updatePet,
    deletePet
  } = app.services.queries

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


  //GET ALL PETS
  controller.listPets = async (req, res) => {
    //GET THE RESULT OF THE SERVICES.QUEUE ADD PET FUNCTION
    const result = await getPets()
    //SEND RESPONSE WITH RESULT DATA
    res.status(result.status).json({
      data: petsResult(result.data)
    })
  }

  //ADD A NEW PET
  controller.addPet = async (req, res) => {
    const {
      ownerId,
      petName,
      petType,
      petBreed
    } = req.body;

    console.log(      ownerId,
      petName,
      petType,
      petBreed)
      
    console.log(typeof(ownerId),
    typeof(petName),
    typeof(petType),
    typeof(petBreed))
    //CHECK PARAMS
    //if (ownerId && petName && petType && petBreed) {
      const petId = uuidV4();
      const params = [ownerId, petId, petName, petType, petBreed]

      //GET THE RESULT OF THE SERVICES.QUEUE ADD PET FUNCTION
      const result = await addPetQ(params)
      //SEND RESPONSE WITH RESULT DATA
      res.status(result.status).json({
        data: result.data
      })
    {/*
    } else {
      //MISSING PARAMS
      res.status(400).send({
        data: "Faltam dados para cadastrar o Pet"
      })
    }
  */}

  }

  //GET PETS BY USERID
  controller.getPetsByUserId = async (req, res) => {
    // GET USERID FROM REQ PARAMS
    const {
      userId
    } = req.params

    // GET ALL INFO OF THE USER PER USERID
    if (await checkUser(userId)) {
      //GET THE RESULT OF THE SERVICES.QUEUE GET PETS WITH USERID FUNCTION
      const result = await getPetsByUserIdQ(userId)
      //SEND RESPONSE WITH RESULT DATA
      res.status(result.status).send({
        data: petsResult(result.data)
      })
    } else {
      //IN CASE USER DOESNT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }
  }

  //GET PET BY PETID
  controller.getPetByPetId = async (req, res) => {
    const {
      petId
    } = req.params

    //CHECK IF PET EXISTS
    if (await checkPet(petId)) {
      //IF EXISTS
      //GET THE RESULT OF THE SERVICES.QUEUE GET PET WITH PETID FUNCTION
      const result = await getPetByPetIdQ(petId)
      //SEND RESPONSE WITH RESULT DATA
      res.status(result.status).send({
        data: petsResult(result.data)
      })
    } else {
      //IN CASE PET DOESNT NOT EXIST
      res.status(200).send({
        data: messages(2)
      })
    }
  }


  //UPDATE PET BY PETID
  controller.updatePetByPetId = async (req, res) => {
    const {
      petId
    } = req.params

    const {
      petName,
      petType,
      petBreed
    } = req.body


    //CHECK PARAMS
    if (petName && petType && petBreed) {
      if (await checkPet(petId)) {
        //IF EXISTS

        const petParams = [
          petName, petType, petBreed, petId
        ]

        //GET THE RESULT OF THE SERVICES.QUEUE UPDATE PET FUNCTION      
        const result = await updatePet(petId, petParams)
        // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
        res.status(result.status).json({
          data: result.data
        })
      } else {
        //IN CASE PET DOESNT EXISTS
        res.status(400).send({
          data: messages(2)
        })
      }
    } else {
      //MISSING PARAMS
      res.status(400).send({
        data: "Faltam dados para atualizar o Pet"
      })
    }

  }


  //DELETE PET BY PETID
  controller.removePetByPetId = async (req, res) => {
    const {
      petId
    } = req.params;

    // CHECK IF PET EXISTS
    if (await checkPet(petId)) {
      // IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE DELETE PET FUNCTION      
      const result = await deletePet(petId)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      // IN CASE PET DOESNT EXISTS
      res.status(400).send({
        data: messages(2)
      })
    }
  }


  return controller;
}