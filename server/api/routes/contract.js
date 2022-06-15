module.exports = app => {
    const controller = app.controllers.contract
    const services = app.services.accessToken 
    const { authorization } = services

    app.route('/api/v1/contracts')
        .get(authorization, controller.getQueues)
        .post(authorization, controller.createContract)
        .delete(authorization, controller.deleteContract)

    app.route('/api/v1/contracts/:userId')
        .get(authorization, controller.getQueuesByUserId)

    app.route('/api/v1/contracts/status')
        .put(authorization, controller.updateContractStatus)


    app.route('/api/v1/contracts/price')
        .put(authorization, controller.updateContractPrice)


    app.route('/api/v1/feedbacks')
        .get(authorization, controller.getFeedBacks)
        .post(authorization, controller.createFeedBacks)
}