/**
 * Created by Bishaka on 21/04/2017.
 */
var gut = {};
var bcrypt = require('bcrypt');

gut.encryptText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};
        
        var saltRounds = opts["saltRounds"] || 10; //Default to 10 saltRounds
        var text = opts["text"];

        bcrypt.hash(text,saltRounds,function(err,hash){
            resolve({hash:hash});
        });        
    });
};

gut.compareText = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};
        
        var text = opts["text"];
        var hash = opts["hash"];
        
        bcrypt.compare(text,hash, function(err, match) {
            resolve({match:match});
        });
    });
};

module.exports = gut;