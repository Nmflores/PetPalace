const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

let returnObj = function async(result) {
  console.log(result)
  if (result.length > 0) {
    // CREATE A JSON RESPONSE TO SEND
    const response = {
      users: result.map((user) => {
        return {
          userId: user.user_id,
          userRole: user.user_role,
        };
      }),
    };
    return response;
  } 
};

const JWT_SECRET_KEY = 'chaveMestra';

let createAuthJwt = function async (user){
  const userId = user[0]['USER_ID'];
  const role = user[0]['USER_ROLE'];
  const tokenPayload = { userId, role };
  const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
  return accessToken;
}



module.exports = app => {
  const dbConn = app.get("dbConn");
  const controller = {};

 
 
  controller.login = async (req, res) => {
    const {
      username,
      password
    } = req.body;
    // VERIFY USERNAME
    const query = "SELECT EMAIL FROM USERS_AUTH A WHERE A.USERNAME = ?;";
    // CALL THE EXECUTE PASSING THE QUERY AND THE PARAMS
    dbConn.pool.query(query, [username], (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        if(result.length > 0){
            // CHECK PASSWORD
            const query = "SELECT A.USER_ID FROM USERS_AUTH A WHERE A.USERNAME = ? AND A.PASSWORD = ?;";
            dbConn.pool.query(query, [username, password], (err, result) => {
                if(err){
                    res.status(404).send(err);
                }else{
                  if(result.length > 0){
                    //CREATES JWT WITH USER_ID AND USER_ROLE
                    const tokenJWT = createAuthJwt(result);
                    console.log(tokenJWT)
                    res.status(200).send({jwt: tokenJWT});

                  }else{
                    res.status(404).send({msg : "Credenciais incorretas, digite novamente"});
                  }
                }
            });
        }else{
            res.status(404).send({msg : `Credenciais incorretas, digite novamente`});
        }
      }
    });
    
    }
    return controller;
  };




