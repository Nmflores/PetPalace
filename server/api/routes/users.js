module.exports = app => {
    const controller = app.controllers.users;
    const services = app.services.accessToken 
    const { authorization } = services

    app.route('/api/v1/users')
      .get(authorization, controller.listUsers)
  
    app.route('/api/v1/users/:userId')
      .get(authorization, controller.getUser)
      .delete(authorization, controller.removeUser)
      .put(authorization, controller.updateUser);


  }