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

  controller.deleteWork = (req, res) => {
    const {
      userId,
      serviceId
    } = req.body;
    const query =
      "DELETE FROM WORKER_SERVICES WHERE USER_ID = ? AND SERVICE_ID = ?;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    pool.query(query, [userId, serviceId], (err, result) => {
      if (err) res.status(404).send(err);
      else {
        if (result.affectedRows > 0) {
          res.status(201).send({
            msg: "Serviço deletado com sucesso"
          });
        } else {
          res.status(500).send({
            msg: "Erro ao deletar serviço"
          });
        }
      }
    });
  };

  return controller;
};