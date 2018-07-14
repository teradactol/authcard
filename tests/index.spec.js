var authcard = require('../index')
var expect = require('chai').expect

describe('Authcard', function(){
    describe('"passhash"', function(){
      it('should export a function', function(){
        expect(authcard.passhash).to.be.a('function')
      })
    })
    describe('"encryptutils"', function(){
        it('should export an object', function(){
          expect(authcard.encryptutils).to.be.an('object')
        })
    })    
  })