
module.exports = (app) => {
    const controller = app.controllers.works;
  
    app.route('/api/v1/works')
      .get(controller.showAll)
      .post(controller.addWork);
  
    app.route('/api/v1/works/:serviceId')
      .get(controller.showAllById)
  }