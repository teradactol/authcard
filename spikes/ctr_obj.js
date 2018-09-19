var encryptutils = require("../encryptutils");
var authcard = require("../index");

var obj= {name:"bishaka samuel","age":25};

//Password should be 32 characters in length
var pass = "S62Sb.[RXFD#QCRx7n63A*C:ZzkaS7N;";

var pass_2 = "@&{Ey=Hv6(@vkJFbJ6';Mr52Ud\"~Z$5u";

console.log("Obj : " + JSON.stringify(obj));
encryptutils.ctr.encryptObj({
    obj:obj,
    pass:pass
}).then(function(out){
    var hash = out["hash"];
    console.log("Hash : " + JSON.stringify(hash));
    encryptutils.ctr.decryptObj({
        obj:hash,
        pass:pass
    }).then(function(out){
        console.log("Unencrypted : " + JSON.stringify(out["obj"]))
    }).catch(function(out){
        console.log(out);
    });
}).catch(function(out){
    console.log(out);
});