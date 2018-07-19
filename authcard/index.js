var jwt = require('jsonwebtoken');
var encryptutils = require("../encryptutils");

var gut = function (_opts) {
    return new Promise(function (resolve, reject) {
        var opts = _opts || {};

        var card = opts["card"];
        var jwt_pass = opts["jwt_pass"];
        var ctr_pass = opts["ctr_pass"];

        jwt.verify(card,jwt_pass, function(err, decoded) {
            if(err){
                return reject(err)
            }
            encryptutils.ctr.decryptObj({
                obj:decoded,
                pass:ctr_pass
            }).then(function(out){
                var obj = out["obj"];
                resolve(obj);
            });

        });

    })
};

module.exports = gut;