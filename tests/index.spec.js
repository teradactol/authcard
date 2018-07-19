var authcard = require('../index');
var expect = require('chai').expect;

describe('Authcard', function(){
    describe('"passhash"', function(){
      it('should export a function', function(){
        expect(authcard.passhash).to.be.a('function')
      })
    })
    describe('"authpass"', function(){
        it('should export a function', function(){
            expect(authcard.authpass).to.be.a('function')
        })
    })
    describe('"encryptutils"', function(){
        it('should export an object', function(){
          expect(authcard.encryptutils).to.be.an('object')
        })
    })
    describe('"gencard"', function(){
        it('should export a function', function(){
            expect(authcard.gencard).to.be.a('function')
        })
    })
    describe('"authcard"', function(){
        it('should export a function', function(){
            expect(authcard.authcard).to.be.a('function')
        })
    })
  })