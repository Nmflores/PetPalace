const mysql      = require('mysql');
const config     = require('config');
const app        = require('express')();



const pool = mysql.createPool({
    host: config.get('database.host'),
    user: config.get('database.user'),
    password: config.get('database.password'),
    database: config.get('database.databaseName'),
  });
  

  module.exports = {
        pool, 
        execute: async function (query, params = []) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) =>{
                if(error){
                  //console.log(result)
                    reject(error)
                }
                else{
                    conn.query(query, params, (error, result) =>{
                        conn.release()
                        if(error){
                          //console.log(error)
                            reject(error)
                        }
                        else{
                            //console.log(result)
                            resolve(result)
                        }
                    })
                }
            })
        })
      },
    }






   

