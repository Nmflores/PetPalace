module.exports = app => {
    const dbConn = app.get("dbConn");
    const controller = {};


    controller.showAll = (req, res) =>  {
        // GET ALL WORKS AND USER INFO
        const query = "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id;";    
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        dbConn.pool.query(query, (err, result) => {
          if (err) res.status(404).send(err);
          else res.status(200).send(result);
        });
    }

    controller.showAllById = (req, res) =>  {
        // GET B.SERVICE_ID FROM REQ.PARAMS
        const { serviceId } = req.params;
        // GET ALL WORKS AND USER INFO
        const query = "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_id = B.user_id AND C.service_id = B.service_id AND B.service_id = ?;";
        
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        dbConn.pool.query(query, [serviceId], (err, result) => {
          if (err) res.status(404).send(err);
          else res.status(200).send(result);
        });
    }

    controller.addWork = (req, res) =>{
        // GET B.SERVICE_ID FROM REQ.PARAMS
        const { userId, serviceId } = req.params;
        // GET ALL WORKS AND USER INFO
        const query = "INSERT INTO WORKER_SERVICES(USER_ID, SERVICE_ID) VALUES(?,?);";
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        dbConn.pool.query(query, [userId, serviceId], (err, result) => {
          if (err) res.status(404).send(err);
          else res.status(200).send(result);
        }); 
    }



    return controller;
};
