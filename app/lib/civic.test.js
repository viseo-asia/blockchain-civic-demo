const td = require('testdouble')
const assert = require('assert')

const civic = require('./civic')
const fixture = require('../../test/fixtures/200-civic-exchange-data')

describe('civic', () => {

    it('should return userdata', (done) => {

        const civicClient = {
            exchangeCode: () => Promise.resolve(fixture)
        }

        civic.authenticate(civicClient, fixture.response)
            .then(
                res => {
                    // console.log('res', res) 
                    assert.equal(res.data.length, 2)
                }
            )
            .then(done, done)
    });

    it('should handle API errors', done => {

        const civicClient = {
            exchangeCode: () => Promise.reject(Error(401))
        }

        civic.authenticate(civicClient, fixture.response).then(res => {
            assert.equal(res.message, 401)
            done()
        })

    })

});
