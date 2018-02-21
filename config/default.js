const fs = require('fs')
const nconf = require('nconf')

module.exports = nconf

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. Docker EE created secret files
//
nconf
    .argv()
    .env()
    // load docker ee secrets files (if they exist)
    .file('civicAppId', '/run/secrets/civic_app_id.json')
    .file('civicAppSecret', '/run/secrets/civic_app_secret.json')
    .file('civicPrivateKey', '/run/secrets/civic_private_key.json')

nconf.defaults({
    app: {
        name: 'Civic Blockchain Auth App',
        version: '1.0.0'
    },
    server: {
        port: 3000
    },
    template: {
        path: 'app/views',
        options: {
            map: { ejs: 'ejs' }
        }
    },
    session: {
        secretKey: 'myKoajsSecretKey'
    },

    civic: {
        appId: process.env.CIVIC_APP_ID || 'CIVIC_APP_ID',
        appSecret: process.env.CIVIC_APP_SECRET || 'CIVIC_APP_SECRET',
        // private signing key
        prvKey: process.env.CIVIC_PRV_KEY || 'CIVIC_PRV_KEY'
    }
})
