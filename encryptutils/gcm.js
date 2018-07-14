/**
 * Created by Bishaka on 20/04/2017.
 */
var gut = {};
var async = require("async");
var crypto = require('crypto');
var algorithm = 'aes-256-gcm';
var ctr = require("./ctr");

gut.encryptObj = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};
        var obj = opts["obj"];
        var pass = opts["pass"];

        var obj_string = JSON.stringify(obj);
        var iv = opts["iv"] || crypto.randomBytes(16).toString("hex");
        var key = opts["key"] || crypto.randomBytes(16).toString("hex");
        var encrypted_obj = {};

        async.parallel({
            __data_n_tag__:function(data_n_tag_cb){
                var cipher = crypto.createCipheriv(algorithm, key, iv);
                var encrypted_data = cipher.update(obj_string, 'utf8', 'hex');
                encrypted_data += cipher.final('hex');
                var plain_tag = cipher.getAuthTag().toString('hex');
                ctr.encryptText({text:plain_tag,pass:pass}).then(function(tag_res){
                    var encrypted_tag = tag_res["text"];
                    data_n_tag_cb(null,{tag:encrypted_tag,data:encrypted_data});
                })
            },
            __iv__:function(iv_cb){
                ctr.encryptText({text:iv,pass:pass}).then(function(iv_res){
                    var text = iv_res["text"];
                    iv_cb(null,text);
                })
            },
            __key__:function(key_cb){
                ctr.encryptText({text:key,pass:pass}).then(function(key_res){
                    var text = key_res["text"];
                    key_cb(null,text);
                })
            }
        },function(err,res){
            encrypted_obj["tag"] = res["__data_n_tag__"]["tag"];
            encrypted_obj["data"] = res["__data_n_tag__"]["data"];
            encrypted_obj["iv"] = res["__iv__"];
            encrypted_obj["key"] = res["__key__"];
            resolve({hash:encrypted_obj});
        })

    });
};

gut.decryptObj = function(_opts){
    return new Promise(function(resolve,reject){
        var opts = _opts || {};
        
        var obj = opts["obj"];
        var pass = opts["pass"];

        var decrypted_obj = {};

        async.parallel({
            tag:function(tag_cb){
                ctr
                    .decryptText({text:obj["tag"],pass:pass})
                    .then(function(tag_res){
                        var text = tag_res["text"];
                        tag_cb(null,text);
                    })
            },
            iv:function(iv_cb){
                ctr
                    .decryptText({text:obj["iv"],pass:pass})
                    .then(function(iv_res){
                        var text = iv_res["text"];
                        iv_cb(null,text);
                    })
            },
            key:function(key_cb){
                ctr
                    .decryptText({text:obj["key"],pass:pass})
                    .then(function(key_res){
                        var text = key_res["text"];
                        key_cb(null,text);
                    })
            }
        },function(err,res){
            var tag = Buffer.from(res["tag"], 'hex');
            var iv = res["iv"];
            var key = res["key"];

            var decipher = crypto.createDecipheriv(algorithm, key, iv);
            decipher.setAuthTag(tag);

            var decrypted_data = decipher.update(obj["data"], 'hex', 'utf8');
            decrypted_data += decipher.final('utf8');

            decrypted_obj = JSON.parse(decrypted_data);

            resolve({obj:decrypted_obj});
        });
    });
};

module.exports = gut;