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

const secretKey = 'chaveMestra';

let createAuthJwt = function async (user){
  const userId = user[0]['USER_ID'];
  const role = user[0]['USER_ROLE'];
  const tokenPayload = { userId, role };
  const accessToken = jwt.sign(tokenPayload, secretKey);
  return accessToken;
}

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
                    //CREATES JWT WITH USER_ID AND USER_ROLE
                    const tokenJWT = createAuthJwt(result);
                    console.log(tokenJWT)
                    res.status(200).send({jwt: tokenJWT});

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




