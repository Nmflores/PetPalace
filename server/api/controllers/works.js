module.exports = (app) => {
  const dbConn = app.get("dbConn");
  const controller = {};

  controller.listWorks = (req, res) => {
    const query =
      "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, (err, result) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(result);
    });
  };

  controller.listWorksByUserId = (req, res) => {
    const { userId } = req.params;
    if(userId){
      const query =
      "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND A.user_id = ?;";
    dbConn.pool.query(query, [userId], (err, result) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(result);
    });
    }
    else{
      res.status(404).send({msg : `Faltam informaçoes para continuar com a busca de Serviços`});
    }
  };

  controller.listWorkByServiceId = (req, res) => {
    // GET B.SERVICE_ID FROM REQ.PARAMS
    let { serviceId } = req.params;
    if(serviceId){
      serviceId = Number.parseInt(serviceId);
    if (Number.isInteger(serviceId)) {
      const query =
        "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND B.service_id = ?;";

      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      dbConn.pool.query(query, serviceId, (err, result) => {
        if (err) res.status(404).send(err);
        else {
          if (result.length > 0) {
            res.status(200).send(result);
          } else {
            res
              .status(404)
              .send({ msg: `Serviço de Id:[${serviceId}] inexistente` });
          }
        }
      });
    } else {
      res.status(500).send({ msg: "Id de servico deve ser numerico" });
    }
    }else{
      res.status(404).send({msg : `Faltam informaçoes para continuar com a busca de Serviços`});
    }
  };

  controller.addWork = (req, res) => {
    // GET B.SERVICE_ID FROM REQ.PARAMS
    const { userId, serviceId } = req.body;
    if (userId && serviceId) {
      // GET ALL WORKS AND USER INFO
      const query =
        "INSERT INTO WORKER_SERVICES(USER_ID, SERVICE_ID) VALUES(?,?);";
      // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
      dbConn.pool.query(query, [userId, serviceId], (err, result) => {
        if (err) res.status(404).send(err);
        else{
          if(result.affectedRows > 0){
            res.status(200).send({msg : 'Servico cadastrado com sucesso'});
          }else{
            res.status(200).send({msg : 'Erro ao cadastrar servico'});
          }
        }
      });
    } else {
      res.status(404).send({msg : `Faltam informaçoes para continuar com o cadastro de serviço`});
    }
  };

  controller.deleteWork = (req, res) => {
    const { userId, serviceId } = req.body;
    if( userId && serviceId  ){
      const query =
      "DELETE FROM WORKER_SERVICES WHERE USER_ID = ? AND SERVICE_ID = ?;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, [userId, serviceId], (err, result) => {
      if (err) res.status(404).send(err);
      else {
        if (result.affectedRows > 0) {
          res.status(201).send({ msg: "Serviço deletado com sucesso" });
        } else {
          res.status(500).send({ msg: "Erro ao deletar serviço" });
        }
      }
    });
    }else{
      res.status(404).send({msg : `Faltam informaçoes para continuar com a exclusao de serviço`});
    }
  };

  return controller;
};
