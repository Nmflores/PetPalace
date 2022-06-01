const {
    v4: uuidV4
} = require("uuid");




module.exports = app => {
    const dbConn = app.repositories.dbConfig
    const pool = dbConn.initPool();
    const controller = {};
    const {
        registerPetTypesForContract,
        updateLoyalty
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
                // IN CASE QUEUE_ID HAS ALREADY BEEN REGISTERED
                res.status(404).json({
                    msg: 'Feedback já registrado para este Contrato'
                });
            } else {
                // IN CASE THE FEEDBACK INSERTION GOES RIGHT
                if (result.affectedRows > 0) {
                    res.status(201).json({
                        msg: 'Feedback criado com sucesso'
                    })
                    // CREATE A FUNCTION TO CALL THE UPDATE LOYALTY FOR THE 2 USERS INVOLVED
                    const updateUsersLoyalty = async () => {
                        // FOR THE WORKER RATING WE GET THE OWNER RATED VALUE
                        await updateLoyalty(worker_id, owner_rating)
                        // FOR THE OWNER RATING WE GET THE WORKER RATED VALUE
                        await updateLoyalty(owner_id, worker_rating)
                    }
                    // CALL THE FUNCTIONS THAT WILL UPDATE THE USERS LOYALTY
                    updateUsersLoyalty()
                } else {
                    res.status(404).json({
                        msg: 'Erro durante cadastro de feedback'
                    })
                }
            }

        });
    }

    // GET ALL THE FEEDBACKS
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

        // GET THE FEEDBACK BASED ON THE CONTRACT/QUEUE
        controller.getFeedBackByQueueId = async (req, res) => {
            const { queueId } = req.params
            const query =
                "SELECT * FROM USERS_FEEDBACK WHERE QUEUE_ID = ?;";
            pool.query(query, [queueId], (err, result) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    if (result.length > 0) {
                        res.status(201).json(result)
                    } else {
                        res.status(404).json({
                            msg: 'Nenhum feedback cadastrado para esta fila'
                        })
                    }
                }
    
            });
        }


    return controller;
};