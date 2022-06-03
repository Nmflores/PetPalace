const {
  v4: uuidV4
} = require("uuid");
const bcrypt = require("bcryptjs");
const encrypt = require("../services/encrypt");



module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

  const { getUsers, getUserByUserId, deleteUser, updateUserQ} = app.services.queries
  const { checkUser } = app.services.checks
  const { usersResult , messages} = app.services.output
  const controller = {};



  controller.listUsers = async (req, res) => {
        const result = await getUsers()
        res.status(result.status).json(usersResult(result.data));
  }


  controller.getUser = async (req, res) => {
    const {
      userId
    } = req.params;
    const result = await getUserByUserId(userId)
    res.status(result.status).json({data : result.data})
    
  }


  // REMOVE USER PER USERID
  controller.removeUser = async (req, res) => {
    const {
      userId
    } = req.params;
    const result = await deleteUser(userId)
    res.status(result.status).json({data : result.data})
  }

  // UPDATE USER PER USERID
  controller.updateUser = async (req, res) => {
    const {
      userId
    } = req.params;
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
  
      const result = await updateUserQ(userId, userParams)
      res.status(result.status).json({data : result.data})
      

  }

  return controller;
};