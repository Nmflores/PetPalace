const app = require('./config/express')();
const port = app.get('port');

const cursor = require("./config/dbConfig.js");


// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});