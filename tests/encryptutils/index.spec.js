var encryptutils = require('../../encryptutils');
var async = require("async");
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var text = "someRandomText to play with";

describe('Encryptutils', function(){
    describe('"bcrypt"', function(){
        it('should export an object', function(){
            expect(encryptutils.bcrypt).to.be.an('object')
        });
        describe('"encryptText"', function(){
            it('should export a function', function(){
                expect(encryptutils.bcrypt.encryptText).to.be.a('function')
            });
            it('Generated hash shouldn\'t equal source text', function(done){
                encryptutils.bcrypt.encryptText({text:text}).then(function(res){
                    var hash = res["hash"];
                    expect(hash).to.not.equal(text);
                    done();
                });
            });
            it('Two hashes from the same source text shouldn\'t be equal', function(done){
                async.parallel({
                    res1:function(res1_cb){
                        encryptutils.bcrypt.encryptText({text:text}).then(function(res){
                            var hash = res["hash"];
                            res1_cb(null,hash)
                        })
                    },
                    res2:function(res2_cb){
                        encryptutils.bcrypt.encryptText({text:text}).then(function(res){
                            var hash = res["hash"];
                            res2_cb(null,hash)
                        })
                    }
                },function(err,results){
                    expect(results["res1"]).to.not.equal(results["res2"]);
                    done();
                });
            });
            it('Should resolve to an object with a hash property that is a string', function(done){
                expect(encryptutils.bcrypt.encryptText({text:text}))
                    .to.eventually.have.a.property("hash")
                    .that.is.a('string')
                    .notify(done);
            });
        });
        describe('"compareText"', function(){
            it('should export a function', function(){
                expect(encryptutils.bcrypt.compareText).to.be.a('function')
            });
            it('Generated hash should match source text when compared', function(){
                expect().to.not.equal()
            });
            it('Generated hash shouldn\'t match non source text when compared', function(){
                expect().to.not.equal()
            });
            it('Should export a function that resolves to an object with a match property that is a boolean', function(){
                expect().to.not.equal()
            });
        });
    })
});