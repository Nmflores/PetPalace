const { v4: uuidV4 } = require('uuid');
const bcrypt = require('bcryptjs');
const encrypt = require('../services/encrypt');

module.exports = app => {
  const usersMockDB = app.data.dbMock;
  const controller = {};

  const {
    users: usersMock,
  } = usersMockDB;

  const {
    usersRole: usersRoleMock,
  } = usersMockDB;

  controller.listUsers = (req, res) => {
    res.status(200).json(usersMockDB);
  }

  controller.listPrestadores = (req, res) => {
    let foundUser = [];

    for(let prestador of usersMock.data){
        if(prestador.userRole === 1){
           console.log("Prestador found");
           foundUser.push(prestador);
        }
    }
    res.status(200).json({message: "Prestador Found", result: foundUser});
  }

  controller.listClients = (req, res) => {
    let foundUser = [];

    for(let client of usersMock.data){
        if(client.userRole === 2){
           foundUser.push(client);
        }
    }
    res.status(200).json({message: "Client Found", result: foundUser});
  }



  controller.saveUser = async (req, res) => {
    // Criar condicionais para cadastro de cada tipo de usuario !!IMPORTANTE


    // Gerar Salt para Encriptar Password
    const salt = await bcrypt.genSalt(10);
    // Setar user.password sendo o password encriptado
    let hashedPass = await encrypt.generatePass(req.body.password, salt);  
    usersMock.data.push({
      userId: uuidV4(),
      username: req.body.username,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      cpf: req.body.cpf,
      email: req.body.email,
      password: hashedPass,
      salt: salt,
      userRole: req.body.userRole,
      lealdade: req.body.lealdade,
      servicos: req.body.servicos,
      pets: req.body.pets
    });

    res.status(201).json(usersMock);
  };
  

  // Remover Usuario por UserID
  controller.removeUser = (req, res) => {
    // Pegando userID dos parametros de requerimento
    const {
      userId,
    } = req.params;

    // Achar index do usuario X com userID passado
    const foundUserIndex = usersMock.data.findIndex(user => user.userId === userId);

    // Caso Usuario nao exista
    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuario não encontrado na base.',
        success: false,
        users: usersMock,
      });
    // Caso Usuario Exista
    } else {
      // Pegando Usuario do mock e setando na variavel
      let resultUser = usersMock.data.splice(foundUserIndex, 1);
      // Entregando resposta com mensagem de sucesso e usuario que foi deletado
      res.status(201).json({
        message: 'Usuario encontrado e deletado com sucesso!',
        success: true,
        users: resultUser,
      });
    }
  };


  // Alterar Usuario por userID
  controller.updateUser = (req, res) => {
    const { 
      userId,
    } = req.params;

    const foundUserIndex = usersMock.data.findIndex(user => user.userId === userId);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuario não encontrado na base.',
        success: false,
        users: usersMock,
      });

    } else {
      const newUser = {
        userId: userId ,
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        cpf: req.body.cpf,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        isPrestador: req.body.isPrestador,
        isCliente: req.body.isCliente,
        pets: req.body.pets
      };
      
      usersMock.data.splice(foundUserIndex, 1, newUser);
      
      res.status(200).json({
        message: 'Usuario encontrado e atualizado com sucesso!',
        success: true,
        users: usersMock,
      });
    }
  }

  return controller;
}