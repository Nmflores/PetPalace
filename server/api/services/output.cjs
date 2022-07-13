module.exports = app => {
    const services = {};

    //400 arquivo nao encontrado ou ja existe
    //401 proibido devido a autorização

    function titleize(text) {
      console.log("texto do titleize: ",text)
      var loweredText = text.toLowerCase();
      var words = loweredText.split(" ");
      for (var a = 0; a < words.length; a++) {
        var w = words[a];
    
        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1)
    
        words[a] = w;
      }
      return words.join(" ");
    }

    services.usersResult = function async (result) {
        if (result.length > 0) {
            // CREATE A JSON RESPONSE TO SEND
            const response =
                result.map((user) => {
                  let fullName = `${titleize(user.first_name)} ${titleize(user.second_name)}`
                    return {
                        userId: user.user_id,
                        firstName: user.first_name,
                        secondName: user.second_name,
                        userGender: user.user_gender,
                        contactNbr: user.contact_nbr,
                        email: user.email,
                        fullName: fullName, 
                        loyalty: user.loyalty,
                    };
                });
            return response;
        }
    };

    services.workersResult = function async (result) {
      if (result.length > 0) {
        // CREATE A JSON RESPONSE TO SEND
        const response = 
        result.map((worker) => {
            return {
              workerId: worker.user_id,
              firstName: worker.first_name,
              secondName: worker.second_name,
              serviceId: worker.service_id,
              serviceName: worker.service_name,
              price: worker.price,
              contactNbr: worker.contact_nbr,
            };
          });
        return response;
      } 
      }

      services.contractsResult = function async (result) {
        if (result.length > 0) {
          // CREATE A JSON RESPONSE TO SEND
          const response = 
          result.map((contract) => {
              return {
                queueId: contract.queue_id,
                workerId: contract.worker_id,
                ownerId: contract.owner_id,
                serviceId: contract.service_id,
                price: contract.price, 
                workerName : contract.workerName,
                ownerName : contract.ownerName,
                workerContactNumber : contract.workerContactNumber,
                ownerContactNumber : contract.ownerContactNumber,
                serviceName: contract.serviceName,
                status: contract.status,
                entryDate: contract.entry_date,
                endDate: contract.end_date
              }
            })
          return response
        } 
        }

    services.petsResult = function async (result) {
        if (result.length > 0) {
          // CREATE A JSON RESPONSE TO SEND
          const response = 
          result.map((pet) => {
              return {
                ownerId: pet.OWNER_ID,
                ownerName: pet.FIRST_NAME,
                petId: pet.PET_ID,
                petName: pet.PET_NAME,
                petType: pet.PET_TYPE,
                petBreed: pet.PET_BREED,
              };
            });
          return response;
        } 
        }

    services.errorHandler = (err) => {}
    services.messages = (msgNbr) => {
        const messages = [
            "Usuario já cadastrado no sistema",
            "Usuario não cadastrado no sistema",
            "Pet não cadastrado no sistema",
            "Serviço cadastrado com sucesso",
            "Serviço não encontrado no sistema",
            "Serviço já cadastrado no sistema",
            "Serviço adicionado a fila de espera",
            "Serviço não foi adicionado a fila de espera", 
            ""
        ];
        return messages[msgNbr];
      };

    return services;
}