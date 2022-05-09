
module.exports = (app) => {
    const controller = app.controllers.works;
  
    app.route('/api/v1/works')
      //LIST ALL AVAILABLE WORKS AT THE MOMENT
      .get(controller.listWorks)
      // ADD A NEW AVAILABLE WORK TO THE DATABASE
      .post(controller.addWork)
      // DELETE THE WORK BY USER_ID AND SERVICE_ID
      .delete(controller.deleteWork);
  

    //LIST AVAILABLE WORKS OF USER WITH USER_ID X
    app.route('/api/v1/users/works/:userId')
      .get(controller.listWorksByUserId)
    
    //LIST AVAILABLE WORKS BY SERVICE_ID
    app.route('/api/v1/works/:serviceId')
      .get(controller.listWorkByServiceId)
  }