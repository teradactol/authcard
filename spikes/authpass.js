var encryptutils = require("../encryptutils");

var pass = "ginger";
var pass2 = "ginger2";
var hash = "";


encryptutils.bcrypt.encryptText({
    text:pass
}).then(function(out_1){
    hash = out_1["hash"];
    console.log("---")
    console.log("pass : " + pass);
    console.log("hash : " + hash);
    encryptutils.bcrypt.compareText({
        text:pass,
        hash:hash
    }).then(function(out_2){
        console.log("---")
        console.log("Pass : " + pass);
        console.log("match : " + out_2["match"]);
    })
    encryptutils.bcrypt.compareText({
        text:pass2,
        hash:hash
    }).then(function(out_3){
        console.log("---")
        console.log("Pass2 : " + pass2);
        console.log("match : " + out_3["match"]);
    })
})

