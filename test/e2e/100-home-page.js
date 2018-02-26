const chakram = require('chakram')
const should = require('chai').should() 

describe('Civic App', () => {
    it('should return home page', async () => {
        const res = await chakram.get('http://localhost:3000')
        // console.log(res.body)
        res.body.should.match(/sign in with civic/i)
    })
})