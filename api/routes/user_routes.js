module.exports = app => {
    //const controller = app.controllers.customerWallets;
  
    app.route('/api/v1/usuarios')
      //.get(controller.listCustomerWallets)
      //.post(controller.saveCustomerWallets);
  
    app.route('/api/v1/usuarios/:id_usuario')
      //.delete(controller.removeCustomerWallets)
      //.put(controller.updateCustomerWallets);
  }