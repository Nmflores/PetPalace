module.exports = app => {
    const controller = app.controllers.users;
  
    app.route('/api/v1/users')
      .get(controller.listUsers)
      .post(controller.saveUser);
  
    app.route('/api/v1/users/:userId')
      .delete(controller.removeUser)
      .put(controller.updateUser);

      app.route('/api/v1/users/prestador')
      .get(controller.listPrestadores);

      app.route('/api/v1/users/cliente')
      .get(controller.listClients);
      
  }