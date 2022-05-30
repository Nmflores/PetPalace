module.exports = app => {
    const services = app.services.tests

    //testing functions
    app.route('/api/v1/test/createLoyalty/:userId')
        .get(services.testCreateLoyalty)

}