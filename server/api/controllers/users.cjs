module.exports = (app) => {
  const controller = {};

  const {
    checkUser
  } = app.services.checks

  const {
    getUsers,
    getUserByUserId,
    deleteUser,
    updateUserQ
  } = app.services.queries

  const {
    usersResult,
    messages
  } = app.services.output



  //GET ALL USERS
  controller.listUsers = async (req, res) => {
    // GET THE RESULT OF THE SERVICES.QUEUE GET USERS FUNCTION
    const result = await getUsers()
    // SEND RESPONSE WITH RESULT DATA
    res.status(result.status).json(usersResult(result.data));
  }

  //GET USER WITH USERID AS REQ.PARAM
  controller.getUser = async (req, res) => {
    const {
      userId
    } = req.params;
    //CHECK IF USER EXISTS
    if (await checkUser(userId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE FUNCTION
      const result = await getUserByUserId(userId)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      //IN CASE USER DOESNT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }
  }


  // UPDATE USER WITH USERID AS REQ.PARAM AND INFO  REQ.BODY
  controller.updateUser = async (req, res) => {
    const {
      userId
    } = req.params;
    const {
      firstName,
      secondName,
      userGender,
      contactNbr,
      cpf,
      state,
    } = req.body;

    const userParams = [
      firstName,
      secondName,
      userGender,
      contactNbr,
      cpf,
      state,
      userId
    ];

    //CHECK IF USER EXISTS
    if (await checkUser(userId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE UPDATE USER FUNCTION
      const result = await updateUserQ(userId, userParams)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      //NOT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }

  }

  // REMOVE USER WITH USERID
  controller.removeUser = async (req, res) => {
    const {
      userId
    } = req.params;

    //CHECK IF USER EXISTS
    if (await checkUser(userId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE DELETE USER FUNCTION
      const result = await deleteUser(userId)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      //NOT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }

  }


  return controller;
};