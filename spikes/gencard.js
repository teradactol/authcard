var gencard = require("../gencard");
var authcard = require("../authcard");

var data = {
    "username": "sbishaka@gmail.com",
    "user": "ac30c1df-26ba-4557-b484-a5e4617c1603"
};
var ctr_pass = "Pgp=qcW7P4zJW9tZM58dvdsw!hfDP^_u";
var jwt_pass = "b+a6DQxU4=u9t5ZtxswYGVwaaUNS3?&R";
var fingerprint = "ginger";
var fingerprint2 = "ginger";
var jwt_opts = {expiresIn: '1h'};

console.log(JSON.stringify(data));
gencard({
    data:data,
    ctr_pass:ctr_pass,
    jwt_pass:jwt_pass,
    fingerprint:fingerprint,
    jwt_opts:jwt_opts
}).then(function(out){
    console.log(JSON.stringify(out));
    authcard({
        card:out["card"],
        ctr_pass:ctr_pass,
        fingerprint:fingerprint2,
        jwt_pass:jwt_pass
    })
    .then(function(out){
        console.log(JSON.stringify(out))
    })
    .catch(function(err){
        console.log(JSON.stringify(err))
    })
}).catch(function(err){
    console.log(err);
});