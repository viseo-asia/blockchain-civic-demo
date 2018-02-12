module.exports = {
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
        appId: process.env.CIVIC_APP_ID || null,
        appSecret: process.env.CIVIC_APP_SECRET || null,
        // private signing key
        prvKey: process.env.CIVIC_PRV_KEY || null
    }

};