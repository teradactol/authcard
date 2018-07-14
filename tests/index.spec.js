'use strict'

const authcard = require('../index')
const expect = require('chai').expect

describe('Authcard', () => {
    describe('"passhash"', () => {
      it('should export a function', () => {
        expect(authcard.passhash).to.be.a('function')
      })
    })
    describe('"encryptutils"', () => {
        it('should export an object', () => {
          expect(authcard.encryptutils).to.be.an('object')
        })
    })    
  })