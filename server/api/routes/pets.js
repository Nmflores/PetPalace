
module.exports = (app) => {
    const controller = app.controllers.pets;
    const services = app.services.accessToken 
    const { authorization } = services
  
    app.route('/api/v1/pets')
      .get(authorization, controller.listPets)
      .post(authorization, controller.addPet);
    
    app.route('/api/v1/pets/:petId')
      .get(authorization, controller.getPetsByPetId)
      .put(authorization, controller.updatePetByPetId)
      .delete(authorization, controller.removePetByPetId)
  
    app.route('/api/v1/users/pets/:userId')
      .get(authorization, controller.getPetsByUserId)
    
  }