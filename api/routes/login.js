
module.exports = app => {
    const controller = app.controllers.login;
  
    app.route('/api/v1/users/login')
      //.get(controller.listUsers)
      .post(controller.login);
  
    app.route('/api/v1/users/:userId')
      //.delete(controller.removeUser)
      //.put(controller.updateUser);
  }