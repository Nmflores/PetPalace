const bcrypt = require('bcryptjs');

module.exports = {
    generatePass: function(pass, salt){
        return bcrypt.hash(pass, salt);
    },
    passEncrypt: function(pass, salt){
        
    },
    verifyPass: function(pass){

    }
};