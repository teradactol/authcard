var gut = {};

var crypto = require('crypto');

var async = require("async");

var algorithm = 'aes-256-ctr';

gut.encryptText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};

        var text = opts["text"] + "";
        var pass = opts["pass"];

        var cipher = crypto.createCipher(algorithm,pass);
        var encrypted = cipher.update(text,'utf8','hex');
        encrypted += cipher.final('hex');

        var res = {
            hash:encrypted
        };

        resolve(res);
    });
};

gut.decryptText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};

        var text = opts["text"];
        var pass = opts["pass"];

        var decipher = crypto.createDecipher(algorithm,pass);
        var decrypted = decipher.update(text,'hex','utf8');
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
            gut
                .encryptText({
                    text:val,
                    pass:pass
                })
                .then(function(out){
                    encryptedObj[key] = out["text"];
                    cb();
                });
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
            gut
                .decryptText({
                    text:val,
                    pass:pass
                })
                .then(function(out){
                    decryptedObj[key] = out["text"];
                    cb();
                });
        },function(err){
            resolve({obj:decryptedObj});
        });
        
    });
};

module.exports = gut;