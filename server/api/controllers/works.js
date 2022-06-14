module.exports = (app) => {
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();
  const {
    errorHandler,
    messages
  } = app.services.output
  const controller = {};

  const {
    getWorkers,
    getWorkersByUserId,
    getWorkersByServiceId,
    registerWork, 
    deleteAvailableWork,
  } = app.services.queries

  controller.listWorks = async (req, res) => {
    const result = await getWorkers()
    res.status(result.status).json({
      data: result.data
    })
  };

  controller.listWorksByUserId = async (req, res) => {
    const {
      userId
    } = req.params;
    const result = await getWorkersByUserId(userId)
    res.status(result.status).json({
      data: result.data
    })
  }

  controller.listWorkByServiceId = async (req, res) => {
    // GET B.SERVICE_ID FROM REQ.PARAMS
    let {
      serviceId
    } = req.params;
    serviceId = Number.parseInt(serviceId);
    if (Number.isInteger(serviceId)) {
      const result = await getWorkersByServiceId(serviceId)
      res.status(result.status).json({
        data: result.data
      })
    } else
      res.status(500).send({
        msg: "Id de servico deve ser numerico"
      })

  }

  controller.addWork = async (req, res) => {
    const {
      userId,
      serviceId
    } = req.body;
    const result = await registerWork(userId, serviceId)
    res.status(result.status).json({
      data: result.data
    })
  }

  controller.deleteWork = async (req, res) => {
    const {
      userId,
      serviceId
    } = req.body;

    const result = await deleteAvailableWork(userId, serviceId)
    res.status(result.status).json({
      data: result.data
    })

  }


  return controller;
}