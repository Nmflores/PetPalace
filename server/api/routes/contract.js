module.exports = app => {
    const controller = app.controllers.contract    

    app.route('/api/v1/contracts')
        .get(controller.getQueues)
        .post(controller.createContract)
        .delete(controller.deleteContract)

    app.route('/api/v1/contracts/:userId')
        .get(controller.getQueuesByUserId)

    app.route('/api/v1/contracts/status')
        .put(controller.updateContractStatus)


    app.route('/api/v1/contracts/price')
        .put(controller.updateContractPrice)


    app.route('/api/v1/feedbacks')
        .get(controller.getFeedBacks)
        .post(controller.createFeedBacks)
}