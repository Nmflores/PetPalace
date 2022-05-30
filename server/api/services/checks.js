

module.exports = app => {
  const services = {};
  const dbConn = app.repositories.dbConfig
  const pool = dbConn.initPool();

services.checkUser = async (userId) => {
      const query = "SELECT A.first_name FROM USERS A WHERE USER_ID = ?;";
      return new Promise((resolve) => {
        pool.query(query, userId, (err, result) => {
            if (err) {
                resolve(false);
            } else {
              if (result.length > 0) {
                resolve(true);
              } else {
                resolve(false);
              }
            }
          })
      })
  }
services.checkUserPerUserName = async (username) => {
  const query = "SELECT A.USER_ID FROM USERS_AUTH A WHERE USERNAME = ?;";
  return new Promise((resolve) => {
    pool.query(query, username, (err, result) => {
        if (err) {
            resolve(false);
        } else {
          if (result.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      })
  })
}
  

  return services;
}