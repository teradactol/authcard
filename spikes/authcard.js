var gencard = require("../gencard");
var authcard = require("../authcard");

var card = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjMjBlNDE4MDE3NDkyMTUwNzJlMTNiMjc5ZTk3MDhiZjowNjcyMzg2MWNhYWQ2MTE3IjoiOGQ1OGM0NTZlY2IzNmY3MmI4ZTA0YWUwMGNkNGExMTA6OTVhNTcxNjNjMmExYWViOTkyOThhZjU4MDAwMDBjMjAzOTlhIiwiY2NmOWMxOTczMWZhMDAyMWZiZGNmZTA5NzZhYWY1MTU6ZWQzMDNlNzIiOiJhNjU3OGY4NWZiMzIwYmUzODZhZGI0OWY3M2QzOTVlMjo4MDAyYWY0YmJhZTZiNGM3YmE5Nzk1NTI2NjUyZWRhNjBmNDljMWFjZGYwZDNjMjc1NGI2YWJhODRkZmYxZWQwMTZjYzU2M2IiLCJpYXQiOjE1MzIzMzUxNDAsImV4cCI6MTUzMjQyMTU0MH0.Oa6cvMBu-vKK0IRB69oPzf-WJovV8pvEWh6yA8TdtqU";
var fingerprint = "ginger";
var pass = "V)M5$>&u\"4D9vc8u9^%~@HCcu\"B3V}Fz";
var ctr_pass = "N2Xs$ap$rc%\\W*Y(Fz/.$`q&Z*Ak6kA6";

    authcard({
        card:card,
        ctr_pass:ctr_pass,
        fingerprint:fingerprint,
        jwt_pass:pass
    })
    .then(function(out){
        console.log(JSON.stringify(out))
    })
    .catch(function(err){
        console.log(JSON.stringify(err))
    })