var encryptutils = require('../encryptutils');

var gut = function (_opts) {
    return new Promise(function (resolve, reject) {
        var opts = _opts || {};

        encryptutils
            .bcrypt
            .encryptText(opts)
            .then(resolve);
            
    });
};

module.exports = gut;