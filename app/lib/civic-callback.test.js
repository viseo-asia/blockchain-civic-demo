const assert = require('assert')

const civicCallback = require('./civic-callback')

const fixture = require('../../test/fixtures/200-civic-response.json')

describe('civic', () => {

    it('should return 101', () => {
        assert.equal(civicCallback(fixture.response), 101);
    });

});
