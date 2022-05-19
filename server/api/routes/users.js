module.exports = app => {
    const controller = app.controllers.users;
  
    app.route('/api/v1/users')
      .get(controller.listUsers)
  
    app.route('/api/v1/users/:userId')
      .get(controller.getUser)
      .delete(controller.removeUser)
      .put(controller.updateUser);

    app.route('/api/v1/workers').get(controller.listWorkers);

  }