module.exports = (app) => {
  const controller = {};

  const {
    checkUser
  } = app.services.checks

  const {
    getWorkers,
    getWorkersByUserId,
    getWorkersByServiceId,
    registerWorker,
    updateWorkPrice,
    deleteAvailableWorker,
  } = app.services.queries

  controller.listWorkers = async (req, res) => {
    // GET THE RESULT OF THE SERVICES.QUEUE GET WORKERS FUNCTION
    const result = await getWorkers()
    // SEND RESPONSE WITH RESULT DATA
    res.status(result.status).json({
      data: result.data
    })
  };

  controller.listWorkersByUserId = async (req, res) => {
    const {
      userId
    } = req.params;
    // GET THE RESULT OF THE SERVICES.QUEUE GET WORKERS FUNCTION
    const result = await getWorkersByUserId(userId)
    // SEND RESPONSE WITH RESULT DATA
    res.status(result.status).json({
      data: result.data
    })
  }

  // GET AVAILABLE WORKERs FOR SERVICEID
  controller.listWorkersByServiceId = async (req, res) => {
    // GET B.SERVICE_ID FROM REQ.PARAMS
    let {
      serviceId
    } = req.params;

    //TRANFORM SERVICEID IN INTEGER IN CASE
    serviceId = Number.parseInt(serviceId);
    if (Number.isInteger(serviceId)) {
        const controller = {};
      // GET THE RESULT OF THE SERVICES.QUEUE GET WORKERS BY SERVICEID FUNCTION
      const result = await getWorkersByServiceId(serviceId)
      // SEND RESPONSE WITH RESULT DATA
      res.status(result.status).json({
        data: result.data
      })
    } else{
      // IN CASE SERVICEID IS NOT NUMERIC
      res.status(400).send({
        data: "Id de serviço deve ser numerico"
      })
    }
      

  }

  controller.addWorker = async (req, res) => {
    const {
      userId,
      serviceId,
      price
    } = req.body;

    if (await checkUser(userId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE REGISTER WORKER FUNCTION      
      const result = await registerWorker(userId, serviceId, price)
      // SENDS RESPONSE WITH RESULT DATA
      res.status(result.status).json({
        data: result.data
      })
    } else {
      //NOT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }

  }

  //UPDATE SERVICE PRICE
  controller.updatePrice = async (req, res) => {
    const {
      userId,
      serviceId,
      price
    } = req.body;
    console.log(userId,
      serviceId,
      price)
    // CHECK IF USER EXISTS
    if (await checkUser(userId)) {
      //IF EXISTS
      // GET THE RESULT OF THE SERVICES.QUEUE REGISTER WORKER FUNCTION      
      const result = await updateWorkPrice(userId, serviceId, price)
      // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
      res.status(result.status).json({
        data: result.data
      })
    } else {
      //NOT EXISTS
      res.status(400).json({
        data: "Nenhum Usuario Cadastrado com este ID"
      })
    }

  }

  // DELETE WORKER WITH USERID, SERVICEID AS REQ.BODY
  controller.deleteWorker = async (req, res) => {
    const {
      userId,
      serviceId
    } = req.body;
    console.log(req.body)
    // CHECK IF REQ HAS USERID AND SERVICEID
    if (userId && serviceId >= 0) {
      if (await checkUser(userId)) {
        //IF EXISTS
        // GET THE RESULT OF THE SERVICES.QUEUE DELETE WORKER FUNCTION      
        const result = await deleteAvailableWorker(userId, serviceId)
        // SENDS RESULT DATA AS RESPONSE DATA FOR CLIENT
        res.status(result.status).json({
          data: result.data
        })
      } else {
        //NOT EXISTS
        res.status(400).json({
          data: "Nenhum Usuario Cadastrado com este ID"
        })
      }
    } else {
      // MISSING PARAMS
      res.status(400).json({
        data: "Faltam informações para deletar o serviço de Prestador"
      })
    }
  }

  return controller;
}