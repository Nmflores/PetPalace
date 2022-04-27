const bcrypt = require('bcryptjs');
const accessToken = require('../services/jwt');
const encrypt = require('../services/encrypt');





module.exports = app => {
  const cursor = app.get("cursor");
  const controller = {};

 
 
  controller.login = async (req, res) => {
    const {
      username,
      password
    } = req.body;
    // VERIFY USERNAME
    const query = "SELECT EMAIL FROM USERS_AUTH A WHERE A.USERNAME = ?;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    cursor.pool.query(query, [username], (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        if(result.length > 0){
            // CHECK PASSWORD
            const query = "SELECT A.USER_ID, B.USER_ROLE FROM USERS_AUTH A, USERS B WHERE A.USERNAME = ? AND A.PASSWORD = ? AND A.USER_ID = B.USER_ID;";
            cursor.pool.query(query, [username, password], (err, result) => {
                if(err){
                    res.status(404).send(err);
                }else{
                  if(result.length > 0){
                  res.status(200).send(result);
                  }else{
                    res.status(404).send({msg : "Password incorreto, digite novamente"});
                  }
                }
            });
        }else{
            res.status(404).send({msg : `Usernme ${username} nao encontrado no sistema`});
        }
      }
    });
    
    }
    return controller;
  };




