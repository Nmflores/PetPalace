
module.exports = (app) => {
    const controller = app.controllers.pets;

  
    app.route('/api/v1/pets')
      .get(controller.listPets)
      .post(controller.addPet);
    
    app.route('/api/v1/pets/:petId')
      .get(controller.getPetByPetId)
      .put(controller.updatePetByPetId)
      .delete(controller.removePetByPetId)
  
    app.route('/api/v1/users/pets/:userId')
      .get(controller.getPetsByUserId)
    
  }