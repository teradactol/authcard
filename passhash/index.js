var bcrypt = require('bcrypt');

var gut = function (_opts) {
    return new Promise(function (resolve, reject) {
        var opts = _opts || {};

        var saltRounds = opts["saltRounds"];
        var text = opts["text"];

        bcrypt.hash(text,saltRounds,function(err,hash){
            resolve({
                hash:hash
            });
        });

    });
};

module.exports = gut;