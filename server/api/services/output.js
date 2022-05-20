module.exports = app => {
    const services = {};

    services.usersResult = function async (result) {
        if (result.length > 0) {
            // CREATE A JSON RESPONSE TO SEND
            const response =
                result.map((user) => {
                    return {
                        userId: user.user_id,
                        firstName: user.first_name,
                        secondName: user.second_name,
                        userGender: user.user_gender,
                        userRole: user.user_role,
                        cpf: user.cpf,
                        loyalty: user.loyalty,
                        address: user.address,
                        addressNbr: user.address_nbr,
                        district: user.district,
                        cep: user.cep,
                        state: user.state,
                    };
                });
            return response;
        }
    };

    services.petsResult = async(result) => {
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
        } else {
        }

    services.errorHandler = (error) => {
      if (error.errno === 1062) {
        services.messages(1)
      }
    };

    services.messages = (msgNbr) => {
        const messages = [
            'Usuario ja cadastrado no sistema',
            'Usuario nao cadastrado no sistema',
            "Pet nao cadastrado no sistema"

        ];
        return messages[msgNbr];
      };

    return services;
}