module.exports = app => {
    const controller = app.controllers.users;
  
    app.route('/api/v1/users')
      .get(controller.listUsers)
      .post(controller.saveUser);
  
    app.route('/api/v1/users/:userId')
      .delete(controller.removeUser)
      .put(controller.updateUser);

      app.route('/api/v1/users/workers')
      .get(controller.listWorkers);

      app.route('/api/v1/users/clients')
      .get(controller.listClients);
      
  }