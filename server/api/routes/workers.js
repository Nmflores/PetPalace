
module.exports = (app) => {
    const controller = app.controllers.workers;
    const services = app.services.accessToken 
    const { authorization } = services

  
    app.route('/api/v1/workers')
      //LIST ALL AVAILABLE WORKS AT THE MOMENT
      .get(authorization, controller.listWorkers)
      // ADD A NEW AVAILABLE WORK TO THE DATABASE
      .post(authorization, controller.addWorker)
      // UPDATE THE WORK PRICE BY USERID, SERVICEID AND THE NEW PRICE
      .put(authorization, controller.updatePrice)
      // DELETE THE WORK BY USERID, SERVICEID ON REQ.BODY
      .delete(authorization, controller.deleteWorker);
  
    //LIST AVAILABLE WORKS BY SERVICE_ID
    app.route('/api/v1/workers/:serviceId')
      .get(authorization, controller.listWorkersByServiceId)

    //LIST AVAILABLE WORKS OF USER WITH USER_ID X
    app.route('/api/v1/users/workers/:userId')
      .get(authorization, controller.listWorkersByUserId)
    
    
  }