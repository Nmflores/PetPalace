module.exports = app => {
    const controller = app.controllers.contract

    app.route('/api/v1/contracts')
        .get(controller.getQueues)
        .post(controller.createContract)
        .delete(controller.deleteContract)

    app.route('/api/v1/contracts/:userId')
        .get(controller.getQueuesByUserId)

    app.route('/api/v1/contracts/status')
        .post(controller.updateContractStatus)


    app.route('/api/v1/contracts/price')
        .post(controller.updateContractPrice)


    app.route('/api/v1/contracts/feedbacks')
        .post(controller.createFeedBacks)
        .get(controller.getFeedBacks)
}