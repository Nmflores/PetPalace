const jwt = require('jsonwebtoken');
//const app = require('config/express')();
//const key = app.get('key');

const JWT_SECRET_KEY = 'vintesete';


module.exports.jwtGenAccessToken = function (user) { 
    const userId = user.userId;
        const role = user.role;
        const tokenPayload = { userId, role };
        const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
        return accessToken;
};