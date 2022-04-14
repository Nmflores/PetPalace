const { v4: uuidV4 } = require('uuid');

module.exports = app => {
  const usersMockDB = app.data.usersMock;
  const controller = {};

  const {
    users: usersMock,
  } = usersMockDB;

  controller.listUsers = (req, res) => {
    res.status(200).json(usersMockDB);
  }

  controller.saveUser = (req, res) => {
    usersMock.data.push({
      userId: uuidV4(),
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
    });

    res.status(201).json(usersMock);
  };

  controller.removeUser = (req, res) => {
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
      usersMock.data.splice(foundUserIndex, 1);
      res.status(200).json({
        message: 'Usuario encontrado e deletado com sucesso!',
        success: true,
        users: usersMock,
      });
    }
  };

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