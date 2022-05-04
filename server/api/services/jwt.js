const jwt    = require('jsonwebtoken');


const JWT_SECRET_KEY = 'chaveMestra';


//MIDDLEWARE FOR JWT
//GET THE TOKEN AND VERIFY, THEN SENDS THE INFO TO THE RESPONSE AS A LOCAL USER VARIABLE((CLIENT-SIDE))
function authenticationMiddleware(request, response, nextHandler) {
  const accessToken = getAccessTokenFromHeader(request);

  try {
    const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
    response.locals.user = tokenPayload;
    nextHandler();
  } catch (error) {
    response.status(401).send(error.message);
  }
}