// const jwt = require('jsonwebtoken')

exports.authenticate = async (civicClient, jwtToken) => {
    //TODO validate jwt token before sending to Civic SIP server (expired, invalid etc)
    // console.log(301, jwtToken)
    // console.log(jwt.decode(jwtToken))
    return exchangeCode(civicClient, jwtToken)
}

function exchangeCode(civicClient, jwtToken) {
    return civicClient.exchangeCode(jwtToken)
        .then((userData) => {
            // store user data and userId as appropriate
            // console.log('userData = ', JSON.stringify(userData, null, 4));
            // return JSON.stringify(userData, null, 4)
            return userData
        }).catch((error) => {
            return error
        })
}
