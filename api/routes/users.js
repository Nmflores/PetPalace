module.exports = app => {
    const controller = app.controllers.users;
  
    app.route('/api/v1/usuarios')
      .get(controller.listUsers)
      .post(controller.saveUser);
  
    app.route('/api/v1/usuarios/:userId')
      .delete(controller.removeUser)
      .put(controller.updateUser);
  }