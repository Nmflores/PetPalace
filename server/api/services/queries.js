module.exports = app => {
    const services = {};
    const dbConn = app.repositories.dbConfig
    const pool = dbConn.initPool();

    services.registerPetTypesForContract = async (queueId, petTypes) => {
        return new Promise((resolve) => {
            const query = "INSERT INTO QUEUE_PET_TYPES(QUEUE_ID, PET_TYPE_ID) VALUES(?, ?);";
            
            for (let x in petTypes) {
                pool.query(query, [queueId, petTypes[x].petType], (err, result) => {
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
            }
            
        })
    }
    
    services.createLoyalty = async (userId) =>{
        return new Promise((resolve) => {
            const query = "INSERT INTO LOYALTY(USER_ID) VALUES(?);";
            
                pool.query(query, [userId], (err, result) => {
                    if (err) {
                        console.log(err)
                        resolve(false);
                    } else {
                      if (result.affectedRows > 0) {
                        console.log("loyalty created")
                        resolve(true);
                      } else {
                        resolve(false);
                      }
                    }
                })
 
            
        })
    }


    //NEED TO CERTIFY THAT THE LOYALTY SYSTEM IS REGISTERING AUTOMATICALY FOR ALL NEW USERS
    //NEED TO MAKE A NEW USER TO CERTIFY THAT
    //DONE, WORKING GREAT
    
    //LOYALTY SYSTEM
    //LVL 0 TO 1 -- NEEDS 10 TOTAL STARS OF RATING ON THE FEEDBACKS
    //LVL 1 TO 2 -- NEEDS 15 TOTAL STARS OF RATING ON THE FEEDBACKS
    //LVL 2 TO 3 -- NEEDS 25 TOTAL STARS OF RATING ON THE FEEDBACKS
    //LVL 3 TO 4 -- NEEDS 35 TOTAL STARS OF RATING ON THE FEEDBACKS
    //LVL 4 TO 5 -- NEEDS 25 TOTAL STARS OF RATING ON THE FEEDBACKS 
    // HOW TO PROCEED ??? 2 OPTIONS
    // 1 -- 
    // NEED TO CREATE DATABASE PROCEDURE TO GET OWNER_ID AND WORKER_ID AS TWO MAIN VARIABLES
    // FOR EACH TIME A NEW FEEDBACK IS MADE
    // COMPARE EACH VARIABLES WITH THE LOYALTY TABLE
    // SUM THE RECEIVED ON THE FEEDBACK RATING ON THE ACTUAL RATING, UPDATING THE LAST UPDATED AT AND THE LAST RATING VALUE.
    // 2 --
    // MAKE A MICROSERVICE TO MAKE ALL THE PROCEDURE OF ABOVE, MAYBE HARDER
    services.updateLoyalty = async (userId, plusFactor) =>{
      return new Promise((resolve) => {
        if(plusFactor <= 5){
          let ratingSum = plusFactor;
  
          const query = "SELECT ACTUAL_RATING FROM LOYALTY WHERE USER_ID = ?;";
          pool.query(query, [userId], (err, result) => {
              if (err) {
                  console.log(err)
              } else {
                if (result.length > 0) {
                    let lastRating = result[0].ACTUAL_RATING
                    ratingSum += result[0].ACTUAL_RATING
                    const query = `UPDATE LOYALTY SET ACTUAL_RATING = ?, LAST_RATING = ?, LAST_UPDATED_AT = NOW() WHERE USER_ID = ?;`
                    const params = [ratingSum, lastRating, userId]
                    pool.query(query, params, (err, result) => {
                      if(err){
                        resolve(false)
                      }else{
                        if(result.affectedRows > 0){
                          resolve(true)
                        }
                      }
                    })
                } else {
                  resolve(false)

                }
              }
          })
        }else{
          resolve(false)

        }
      })
      }

    return services;
}