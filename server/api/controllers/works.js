module.exports = (app) => {
    const cursor = app.get("cursor");
    const controller = {};


    // SHOW ALL USERS WITH ROLE 1(WORKERS) AND THEIR JOBS
    controller.showAll = (req, res) => {
        // GET ALL WORKS AND USER INFO
        const query = "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_role = 1 AND A.user_id = B.worker_id AND C.service_id = B.service_id;";
        // CALL THE EXECUTE PASSING THE QUERY
        cursor
        .execute(query)
        .then((result) => {
            if (result.length > 0) {
            // BUILDS THE JSON OBJECT WITH THE RESULT DATA
            const response = {
                users: result.map((user) => {
                return {
                    userId: user.user_id,
                    firstName: user.first_name,
                    secondName: user.second_name,
                    serviceName: user.service_name
                };
                }),
            };
            // RETURN THE BUILDED JSON AS RESPONSE
            return res.status(200).send(response);
            next();
            } else {
            res.status(404).send({ msg: "Nenhum usuario cadastrado" });
            }
        })
        .catch((error) => {
          res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
        });
    };

    // SHOW ALL USERS WITH ROLE 1(WORKERS) AND WITH SERVICE ID X
    controller.showAllById = (req, res) => {
        // GET B.SERVICE_ID FROM REQ.PARAMS
        const { serviceId } = req.params;
        // GET ALL WORKS AND USER INFO
        const query = "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_role = 1 AND A.user_id = B.worker_id AND C.service_id = B.service_id AND B.service_id = ?;";
        // CALL THE EXECUTE PASSING THE QUERY
        cursor
        .execute(query, [serviceId])
        .then((result) => {
            if (result.length > 0) {
            // BUILDS THE JSON OBJECT WITH THE RESULT DATA
            const response = {
                users: result.map((user) => {
                return {
                    userId: user.user_id,
                    firstName: user.first_name,
                    secondName: user.second_name,
                    serviceName: user.service_name
                };
                }),
            };
            // RETURN THE BUILDED JSON AS RESPONSE
            return res.status(200).send(response);
            next();
            } else {
            res.status(404).send({ msg: "Nenhum usuario cadastrado" });
            }
        })
        .catch((error) => {
          res.status(500).send({ msg: `${error.sqlMessage} -- ${error.code}` });
        });
    };
    


    controller.showAllById_alternative = (req, res) =>  {
        // GET B.SERVICE_ID FROM REQ.PARAMS
        const { serviceId } = req.params;
        // GET ALL WORKS AND USER INFO
        const query = "SELECT A.user_id, A.first_name, A.second_name, C.service_name FROM USERS A, WORKER_SERVICES B, AVAILABLE_SERVICES C WHERE A.user_role = 1 AND A.user_id = B.worker_id AND C.service_id = B.service_id AND B.service_id = ?;";
        
        // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
        cursor.pool.query(query, [serviceId], (err, result) => {
          if (err) res.status(404).send(err);
          else res.status(200).send(result);
        });
      }

    return controller;
};
