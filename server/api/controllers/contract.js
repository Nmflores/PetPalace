const {
    v4: uuidV4
} = require("uuid");




module.exports = app => {
    const dbConn = app.repositories.dbConfig
    const pool = dbConn.initPool();
    const controller = {};
    const {
        registerPetTypesForContract
    } = app.services.queries;
    const {
        checkUser,
        checkUserPerUserName
    } = app.services.checks;
    const {
        errorHandler,
        messages
    } = app.services.output

    controller.createContract = async (req, res) => {
        let queueId = uuidV4();
        const {
            workerId,
            clientId,
            serviceId,
            status,
            price,
            petTypes
        } = req.body;

        // VERIFY USERNAME
        if (await checkUser(clientId)) {
            // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
            const params = [
                queueId,
                workerId,
                clientId,
                serviceId,
                status,
                price
            ];
            const query =
                "INSERT INTO SERVICES_QUEUE(QUEUE_ID, WORKER_ID, CLIENT_ID, SERVICE_ID, STATUS, PRICE) VALUES(?);";
            pool.query(query, [params], (err, result) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    if (result.affectedRows > 0) {
                        if (registerPetTypesForContract(queueId, petTypes)) {
                            res.status(201).json({
                                msg: 'Contrato de serviço cadastrado com sucesso'
                            })
                        } else {
                            res.status(404).json({
                                msg: 'Erro ao cadastrar Contrato de serviço'
                            })
                        }


                    } else {
                        res
                            .status(404)
                            .send({
                                msg: "Detalhes incorretos, digite novamente"
                            });
                    }
                }
            });

        } else {
            return res.status(404).send({
                msg: messages(1)
            })
        }


    };

    controller.getQueues = async (req, res) => {
        const query =
            "SELECT * FROM SERVICES_QUEUE;";
        pool.query(query, [], (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (result.length > 0) {
                    res.status(201).json(result)
                } else {
                    res.status(404).json({
                        msg: 'Nenhum serviço na fila'
                    })
                }
            }

        });
    }

    //queue_id -- worker_id -- owner_id -- worker_feedback -- worker_rating(1-5)  
    //owner_feedback -- owner_rating(1-5) -- (entry_date) -- (end_date) 	 	
    //VERIFICAR SE OS PARAMETROS REQUERIDOS EXISTEM EXISTEM 
    //VERIFICAR SE OS USUARIOS EXISTEM, WORKER E OWNER_ID


    controller.createFeedBacks = async (req, res) => {
        const {
            queue_id,
            worker_id,
            owner_id,
            worker_feedback,
            worker_rating,
            owner_feedback,
            owner_rating,
        } = req.body
        const params = [queue_id,
            worker_id,
            owner_id,
            worker_feedback,
            worker_rating,
            owner_feedback,
            owner_rating,
        ]
        const query =
            "INSERT INTO USERS_FEEDBACK(queue_id,worker_id,owner_id,worker_feedback,worker_rating, owner_feedback, owner_rating) VALUES(?);";
        pool.query(query, [params], (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (result.affectedRows > 0) {
                    res.status(201).json({
                        msg: 'Feedback criado com sucesso'
                    })
                } else {
                    res.status(404).json({
                        msg: 'Erro durante cadastro de feedback'
                    })
                }
            }

        });
    }

    controller.getFeedBacks = async (req, res) => {
        const query =
            "SELECT * FROM USERS_FEEDBACK;";
        pool.query(query, [], (err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (result.length > 0) {
                    res.status(201).json(result)
                } else {
                    res.status(404).json({
                        msg: 'Nenhum feedback cadastrado'
                    })
                }
            }

        });
    }


    return controller;
};