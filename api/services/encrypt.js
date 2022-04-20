const bcrypt = require('bcryptjs');

module.exports = {
    generatePass: function(pass){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(!err){
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    return hash;
                });
            }
            else{
                return err;
            }
            
        });
    },
    passEncrypt: function(pass, salt){
        
    },
    verifyPass: function(pass){

    }
};