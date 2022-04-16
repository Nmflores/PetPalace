
module.exports = app => {
    const controller = app.controllers.login;
  
    app.route('/api/v1/login')
      //.get(controller.listUsers)
      .post(controller.login);
  
    app.route('/api/v1/usuarios/:userId')
      //.delete(controller.removeUser)
      //.put(controller.updateUser);
  }