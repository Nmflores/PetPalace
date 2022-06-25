module.exports = (app) => {
  const controller = app.controllers.workers;


  app.route('/api/v1/workers')
    //LIST ALL AVAILABLE WORKS AT THE MOMENT
    .get(controller.listWorkers)
    // ADD A NEW AVAILABLE WORK TO THE DATABASE
    .post(controller.addWorker)
    // UPDATE THE WORK PRICE BY USERID, SERVICEID AND THE NEW PRICE
    .put(controller.updatePrice)
    // DELETE THE WORK BY USERID, SERVICEID ON REQ.BODY
    .delete(controller.deleteWorker);


  app.route('/api/v1/workers/:serviceId')
    //LIST AVAILABLE WORKS BY SERVICE_ID
    .get(controller.listWorkersByServiceId)


  app.route('/api/v1/users/workers/:userId')
    //LIST AVAILABLE WORKS OF USER WITH USER_ID X
    .get(controller.listWorkersByUserId)


}