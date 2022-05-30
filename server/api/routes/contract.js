module.exports = app => {
    const controller = app.controllers.contract

    app.route('/api/v1/contracts')
        .get(controller.getQueues)
        .post(controller.createContract)

    app.route('/api/v1/contracts/feedbacks')
        .post(controller.createFeedBacks)
        .get(controller.getFeedBacks)
}