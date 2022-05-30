const jwt    = require('jsonwebtoken');

module.exports = app => {
  const services = {};
  const JWT_SECRET_KEY = app.get('jwtKey');
  //MIDDLEWARE FOR JWT
//GET THE TOKEN AND VERIFY, THEN SENDS THE INFO TO THE RESPONSE AS A LOCAL USER VARIABLE((CLIENT-SIDE))

services.createAccessToken = (user) =>{
  const userId = user[0]["USER_ID"];
  const tokenPayload = { userId };
  const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
  return accessToken;
}

  return services;
}