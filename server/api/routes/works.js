
module.exports = (app) => {
    const controller = app.controllers.works;
    const services = app.services.accessToken 
    const { authorization } = services

  
    app.route('/api/v1/works')
      //LIST ALL AVAILABLE WORKS AT THE MOMENT
      .get(authorization, controller.listWorks)
      // ADD A NEW AVAILABLE WORK TO THE DATABASE
      .post(authorization, controller.addWork)
      // DELETE THE WORK BY USER_ID AND SERVICE_ID
      .delete(authorization, controller.deleteWork);
  
    //LIST AVAILABLE WORKS BY SERVICE_ID
    app.route('/api/v1/works/:serviceId')
      .get(authorization, controller.listWorkByServiceId)

    //LIST AVAILABLE WORKS OF USER WITH USER_ID X
    app.route('/api/v1/users/works/:userId')
      .get(authorization, controller.listWorksByUserId)
    
    
  }