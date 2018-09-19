var encryptutils = require("../encryptutils");
var authcard = require("../index");

var text = "My Text";
var pass = "S62Sb.[RXFD#QCRx7n63A*C:ZzkaS7N;";
var pass_2 = "@&{Ey=Hv6(@vkJFbJ6';Mr52Ud\"~Z$5u";

console.log("Text : " + text);
encryptutils.ctr.encryptText({
    text:text,
    pass:pass
}).then(function(out){
    var hash = out["hash"];
    console.log("Hash : " + hash);
    encryptutils.ctr.decryptText({
        hash:hash,
        pass:pass_2
    }).then(function(out){
        console.log("Unencrypted : " + out["text"])
    }).catch(function(out){
        console.log(out);
    });
}).catch(function(out){
    console.log(out);
});