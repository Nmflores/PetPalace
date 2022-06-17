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


    controller.createContract = async (req, res) => {
        let queueId = uuidV4();
        const {
            workerId,
            ownerId,
            serviceId,
            price,
            petTypes
        } = req.body;
    if(workerId && ownerId && serviceId && price && petTypes){
        const params = [
            queueId,
            workerId,
            ownerId,
            serviceId,
            price
        ]
        if (await checkUser(ownerId)) {
            const result = await createContract(params, queueId, petTypes)
            res.status(result.status).json({
                data: result.data
            })

        } else {
            return res.status(404).send({
                msg: messages(1)
            })
        }
    }else{
        res.status(400).send({
            data: "Faltam dados para criar o Contrato"
        })
    } 
    }


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
                        data: 'Nenhum serviço na fila'
                    })
                }
            }

        })
    }




    controller.getQueuesByUserId = async (req, res) => {
        const {
            userId
        } = req.params
        if (await checkUser(userId)) {
            const result = await getQueuesByUserId(userId)
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


controller.updateContractPrice = async (req, res) => {
    const {
        queueId,
        price
    } = req.body
    if (queueId && price) {
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
    } else {
        res.status(400).send({
            data: "Faltam dados para alterar o Preço de Contrato"
        })
    }
}

controller.updateContractStatus = async (req, res) => {
    const {
        queueId,
        status
    } = req.body
    if (queueId && status) {

        if (status >= 1 && status <= 3) {
            const result = await updateContractStatus(queueId, status)
            res.status(result.status).json({
                data: result.data
            })
        } else {
            res.status(500).json({
                data: "Status range: 1-3"
            })
        }
    } else {
        res.status(400).send({
            data: "Faltam dados para alterar o Status de Contrato"
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