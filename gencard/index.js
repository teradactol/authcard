var jwt = require('jsonwebtoken');
var encryptutils = require("../encryptutils");

var genToken = function (_opts) {
    return new Promise(function (resolve, reject) {
        var opts = _opts || {};
        var data = opts["data"];

        //TODO Pass jwt_pass and fingerprint through key-derivation algortithm e.g PBKDF2 (Based on https://github.com/auth0/node-jsonwebtoken/issues/208#issuecomment-231861138)
        var fingerprint = opts["fingerprint"];
        var jwt_pass = opts["jwt_pass"];
        var jwt_opts = opts["jwt_opts"];

        jwt.sign(data,jwt_pass+"_"+fingerprint,jwt_opts,function(err,token){
            resolve({
                token:token
            });
        });

    });
};

var gut = function (_opts) {
    return new Promise(function (resolve, reject) {
        var opts = _opts || {};

        var data = opts["data"];
        var jwt_pass = opts["jwt_pass"];
        var ctr_pass = opts["ctr_pass"];
        var jwt_opts = opts["jwt_opts"];

        var ctr_pass_length = ctr_pass.length;

        if(ctr_pass_length < encryptutils.ctr.req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too short (should be "+encryptutils.ctr.req_pass_length+" characters)"
            });
        }

        if(ctr_pass_length > encryptutils.ctr.req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too long (should be "+encryptutils.ctr.req_pass_length+" characters)"
            })
        }

        switch(typeof data){
            case "string":
                return reject({
                    type:"wrong_data_type",
                    msg:"Data wrong type ( exp object got string )"
                });
                break;
            case "object":
                encryptutils.ctr.encryptObj({
                    obj:data,
                    pass:ctr_pass
                }).then(function(out){
                    var hash = out["hash"];
                    genToken({
                        data:hash,
                        jwt_pass:jwt_pass,
                        jwt_opts:jwt_opts
                    }).then(function(out){
                        resolve({
                            card:out["token"]
                        })
                    });
                });
                break;
        }

    })
};

module.exports = gut;