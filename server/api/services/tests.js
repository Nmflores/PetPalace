module.exports = app => {
    const services = {};
    const { createLoyalty } = app.services.queries
    const dbConn = app.repositories.dbConfig
    const pool = dbConn.initPool();

    services.testCreateLoyalty = async (req, next) => {
        const {userId} = req.params
        console.log(await createLoyalty(userId))
        
    }
    
   
    return services;
}