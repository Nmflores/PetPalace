const {
    v4: uuidV4
} = require("uuid");




module.exports = app => {
    const dbConn = app.repositories.dbConfig
    const pool = dbConn.initPool();
    const controller = {};
    const {
        createContract,
        updateLoyalty,
        getQueuesByUserId,
        updateContractStatus,
        updateContractPrice,
        deleteContractByQueueId
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
            ownerId,
            serviceId,
            price,
            petTypes
        } = req.body;

        if (await checkUser(ownerId)) {
            const params = [
                queueId,
                workerId,
                ownerId,
                serviceId,
                price
            ];

            const result = await createContract(params, queueId, petTypes)
            res.status(result.status).json({
                data: result.data
            })

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




    controller.getQueuesByUserId = async (req, res) => {
        const { userId } = req.params
        const result = await getQueuesByUserId(userId)
            res.status(result.status).json({
                data: result.data
            })
    }

    controller.updateContractPrice = async (req, res) => {
        const {
            queueId,
            price
        } = req.body

        if (price > 0) {
            const result = await updateContractPrice(queueId, price)
            res.status(result.status).json({
                data: result.data
            })
        } else {
            res.status(500).json({
                data: "Atribuição de preço não pode ser 0"
            })
        }
    }

    controller.updateContractStatus = async (req, res) => {
        const {
            queueId,
            status
        } = req.body

        if (status >= 1 && status <= 3) {
            const result = await updateContractStatus(queueId, status)
            res.status(result.status).json({
                data: result.data
            })
        } else {
            res.status(500).json({
                data: "Status range: 0-3"
            })
        }
    }


    controller.deleteContract = async (req, res) => {
        const {
            queueId
        } = req.body

        const result = await deleteContractByQueueId(queueId)
        res.status(result.status).json({
            data: result.data
        })
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
        const {
            queueId
        } = req.params
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