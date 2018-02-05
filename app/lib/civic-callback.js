const jwt = require('jsonwebtoken');

const civicCallback = (token) => {
    console.log(token)
    console.log(jwt.decode(token))
    return 101
}

module.exports = civicCallback