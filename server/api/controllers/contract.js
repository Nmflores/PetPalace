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
        getQueues,
        getQueuesByUserId,
        updateContractStatus,
        updateContractPrice,
        updateUserLoyaltyLevel,
        deleteContractByQueueId
    } = app.services.queries;
    const {
        checkUser,
        checkQueue
    } = app.services.checks;
    const {
        messages
    } = app.services.output


    // CREATE CONTRACT 
    controller.createContract = async (req, res) => {
        let queueId = uuidV4();
        const {
            workerId,
            ownerId,
            serviceId,
            price,
            petTypes
        } = req.body;
        // CHECK INSERTION REQ.BODY PARAMS
        if (workerId && ownerId && serviceId && price && petTypes) {
            // SET PARAMS FOR QUERY
            const params = [
                queueId,
                workerId,
                ownerId,
                serviceId,
                price
            ]
            // CHECK IF USER EXISTS
            if (await checkUser(ownerId)) {
                // GET RESULT FROM SERVICES.QUEUE CREATE CONTRACT FUNCTION
                const result = await createContract(params, queueId, petTypes)
                // SEND RESPONSE WITH RESULT DATA
                res.status(result.status).json({
                    data: result.data
                })

            } else {
                // IN CASE USER DOESNT EXISTS
                return res.status(404).send({
                    msg: messages(1)
                })
            }
        } else {
            // IN CASE ANY PARAM IS MISSING
            res.status(400).send({
                data: "Faltam dados para criar o Contrato"
            })
        }
    }


    // GET ALL CONTRACTS
    controller.getContracts = async (req, res) => {
        // GET RESULT FROM SERVICES.QUEUE GET CONTRACTS FUNCTION
        const result = await getQueues()
        // SEND RESPONSE WITH RESULT DATA
        res.status(result.status).json({
            data: result.data
        })
    }

    // GET QUEUES ON CERTAIN USER_ID
    controller.getQueuesByUserId = async (req, res) => {
        const {
            userId
        } = req.params
        // CHECK IF USER EXISTS
        if (await checkUser(userId)) {
            // GET RESULT FROM SERVICES.QUEUE GET QUEUES BY USERID FUNCTION
            const result = await getQueuesByUserId(userId)
            // SEND RESPONSE WITH RESULT DATA
            res.status(result.status).json({
                data: result.data
            })
        }
        //NOT EXISTS
        else {
            res.status(400).json({
                data: "Nenhum Usuario Cadastrado com este ID"
            })
        }
    }


    // UPDATE A CERTAIN CONTRACT PRICE
    controller.updateContractPrice = async (req, res) => {
        const {
            queueId,
            price
        } = req.body
        // CHECK REQ.BODY PARAMS
        if (queueId && price) {
            // CHECK PRICE VALUE
            if (price > 0) {
                //CHECK IF CONTRACT EXISTS
                if (await checkQueue(queueId)) {
                    // GET RESULT FROM SERVICES.QUEUE UPDATE CONTRACT PRICE FUNCTION
                    const result = await updateContractPrice(queueId, price)
                    // SEND RESPONSE WITH RESULT DATA
                    res.status(result.status).json({
                        data: result.data
                    })
                } else {
                    // IN CASE CONTRACT DOESNT EXIST
                    res.status(404).json({
                        msg: 'Nenhum contrato com este ID'
                    })
                }
            } else {
                // IN CASE PRICE HAS WRONG VALUES
                res.status(500).json({
                    data: "Atribuição de preço não pode ser 0"
                })
            }
        } else {
            // MISSING PARAMS
            res.status(400).send({
                data: "Faltam dados para alterar o Preço de Contrato"
            })
        }
    }

    // UPDATE A CERTAIN CONTRACT STATUS
    controller.updateContractStatus = async (req, res) => {
        const {
            queueId,
            status
        } = req.body
        // CHECK REQ.BODY PARAMS

        if (queueId && status) {
            // CHECK STATUS VALUE
            if (status >= 1 && status <= 3) {
                //CHECK IF CONTRACT EXISTS
                if (await checkQueue(queueId)) {
                    // GET RESULT FROM SERVICES.QUEUE UPDATE CONTRACT STATUS FUNCTION

                    const result = await updateContractStatus(queueId, status)
                    // SEND RESPONSE WITH RESULT DATA
                    res.status(result.status).json({
                        data: result.data
                    })
                } else {
                    // IN CASE CONTRACT DOESNT EXISTS
                    res.status(404).json({
                        msg: 'Nenhum contrato com este ID'
                    })
                }

            } else {
                // IN CASE STATUS IS NOT IN RANGE 1-3
                res.status(500).json({
                    data: "Status range: 1-3"
                })
            }
        } else {
            // MISSING PARAMS
            res.status(400).send({
                data: "Faltam dados para alterar o Status de Contrato"
            })
        }
    }


    controller.deleteContract = async (req, res) => {
        const {
            queueId
        } = req.body

        if (await checkQueue(queueId)) {
            // GET RESULT FROM SERVICES.QUEUE DELETE CONTRACT FUNCTION
            const result = await deleteContractByQueueId(queueId)
            // SEND RESPONSE WITH RESULT DATA
            res.status(result.status).json({
                data: result.data
            })
        } else {
            // IN CASE CONTRACT DOESNT EXISTS
            res.status(404).json({
                msg: 'Nenhum contrato com este ID'
            })
        }
    }



    controller.createFeedBacks = async (req, res) => {
        const {
            queueId,
            workerId,
            ownerId,
            workerFeedback,
            workerRating,
            ownerFeedback,
            ownerRating,
        } = req.body
        const params = [
            queueId,
            workerId,
            ownerId,
            workerFeedback,
            workerRating,
            ownerFeedback,
            ownerRating,
        ]
        if (queueId &&
            workerId &&
            workerFeedback &&
            workerRating &&
            ownerFeedback &&
            ownerRating) {

            // CREATE A FUNCTION TO CALL THE UPDATE LOYALTY FOR THE 2 USERS INVOLVED
            const callUpdateLoyalty = async () => {
                // FOR THE WORKER RATING WE GET THE OWNER RATED VALUE
                await updateLoyalty(workerId, ownerRating)
                // FOR THE OWNER RATING WE GET THE WORKER RATED VALUE
                await updateLoyalty(ownerId, workerRating)
            }

            // WILL MAKE THE LOYALTY LEVEL CALCULUS FOR THE 2 USERS INVOLVE
            // UPDATE THE LOYALTY LVL BASED ON THE ACTUAL RATING     
            // UPDATE THE LOYALTY IN THE USER_INFO TABLE AS WELL
            const callUpdateUsersInfoLoyalty = async () => {
                await updateUserLoyaltyLevel(workerId, ownerId)
            }

            if (checkUser(workerId) && checkUser(ownerId)) {
                const query =
                    "INSERT INTO USERS_FEEDBACK(queue_id, worker_id,owner_id, worker_feedback,worker_rating, owner_feedback, owner_rating) VALUES(?);";
                pool.query(query, [params], (err, result) => {
                    if (err) {
                        // IN CASE QUEUE_ID HAS ALREADY BEEN REGISTERED
                        res.status(400).json({
                            data: 'Feedback já registrado para este Contrato'
                        });
                    } else {
                        // IN CASE THE FEEDBACK INSERTION GOES RIGHT
                        if (result.affectedRows > 0) {
                            // CALL THE FUNCTIONS THAT WILL UPDATE THE USERS LOYALTY 
                            callUpdateLoyalty()

                            // CALL THE FUNCTIONS THAT WILL UPDATE THE USERS LOYALTY
                            callUpdateUsersInfoLoyalty()

                            res.status(201).json({
                                data: 'Feedback criado com sucesso'
                            })

                        } else {
                            res.status(400).json({
                                data: 'Erro durante cadastro de feedback'
                            })
                        }
                    }

                })
            } else {
                res.status(400).json({
                    data: 'Um ou ambos Usuario não existem'
                })
            }
        } else {
            res.status(400).send({
                data: "Faltam dados para criar o Feedback"
            })
        }
    }

    // GET ALL THE FEEDBACKS
    controller.getFeedBacks = async (req, res) => {
        const query =
            "SELECT * FROM USERS_FEEDBACK;";
        pool.query(query, [], (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    res.status(200).json({
                        data: result
                    })
                } else {
                    res.status(404).json({
                        data: 'Nenhum feedback cadastrado'
                    })
                }
            }

        });
    }

    // GET THE FEEDBACK BASED ON THE CONTRACT/QUEUE
    controller.getFeedBacksByQueueId = async (req, res) => {
        const {
            queueId
        } = req.params
        if (checkQueue(queueId)) {
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
            })
        } else {
            res.status(404).json({
                msg: 'Nenhum contrato com este ID'
            })
        }
    }


    // DELETE THE FEEDBACK BASED ON THE CONTRACT/QUEUE
    controller.deleteFeedBackByQueueId = async (req, res) => {
        const {
            queueId
        } = req.params
        if (checkQueue(queueId)) {
            const query =
                "DELETE FROM USERS_FEEDBACK WHERE QUEUE_ID = ?;";
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

            })
        } else {
            res.status(404).json({
                msg: 'Nenhum contrato com este ID'
            })
        }
    }

    return controller;
};