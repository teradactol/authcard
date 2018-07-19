var gut = {};

var crypto = require('crypto');

var async = require("async");

var algorithm = 'aes-256-ctr';

var delim = ":";
var req_pass_length = 32;

gut.encryptText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};

        var text = opts["text"] + "";
        var pass = opts["pass"];


        if(pass.length < req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too short (should be 32 characters)"
            })
        }

        if(pass.length > req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too long (should be 32 characters)"
            })
        }

        //Shout out to https://stackoverflow.com/a/29777716 and https://stackoverflow.com/a/42485606
        var iv = crypto.randomBytes(16);

        var cipher = crypto.createCipheriv(algorithm,pass,iv);

        var encrypted = cipher.update(text,'utf8','hex');
        encrypted += cipher.final('hex');

        var hash = iv.toString('hex') + delim + encrypted;

        var res = {
            hash:hash
        };

        resolve(res);
    });
};

gut.decryptText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};

        var _hash = opts["hash"];
        var pass = opts["pass"];

        if(pass.length < req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too short (should be 32 characters)"
            })
        }

        if(pass.length > req_pass_length){
            return reject({
                type:"pass_too_long",
                msg:"pass too long (should be 32 characters)"
            })
        }

        var hash_tokens = _hash.split(delim);
        var hash = hash_tokens[1];

        var iv = new Buffer(hash_tokens[0], 'hex');

        var decipher = crypto.createDecipheriv(algorithm,pass,iv);
        var decrypted = decipher.update(hash,'hex','utf8');
        decrypted += decipher.final('utf8');

        var res = {
            text:decrypted
        };

        resolve(res);
    });
};

gut.encryptObj = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};
        
        var obj = opts["obj"] || {};
        var pass = opts["pass"];

        var encryptedObj = {};

        async.forEachOf(obj,function(val,key,cb){

            async.parallel({
                key:function(key_cb){
                    gut
                        .encryptText({
                            text:key,
                            pass:pass
                        })
                        .then(function(out){
                            key_cb(null,out["hash"]);
                        });
                },
                val:function(val_cb){
                    gut
                        .encryptText({
                            text:val,
                            pass:pass
                        })
                        .then(function(out){
                            val_cb(null,out["hash"]);
                        });
                }
            },function(err,results){
                encryptedObj[results["key"]] = results["val"];
                cb();
            })

        },function(err){
            resolve({hash:encryptedObj});
        });
    });
};

gut.decryptObj = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};

        var obj = opts["obj"] || {};
        var pass = opts["pass"];

        var decryptedObj = {};

        async.forEachOf(obj,function(val,key,cb){

            async.parallel({
                key:function(key_cb){
                    gut
                        .decryptText({
                            hash:key,
                            pass:pass
                        })
                        .then(function(out){
                            key_cb(null,out["text"]);
                        });
                },
                val:function(val_cb){
                    gut
                        .decryptText({
                            hash:val,
                            pass:pass
                        })
                        .then(function(out){
                            val_cb(null,out["text"]);
                        });
                }
            },function(err,results){
                decryptedObj[results["key"]] = results["val"];
                cb();
            });

        },function(err){
            resolve({obj:decryptedObj});
        });
        
    });
};

module.exports = gut;