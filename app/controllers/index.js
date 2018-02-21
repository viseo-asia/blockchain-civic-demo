const config = require('../../config/default')
const civicSip = require('civic-sip-api')

const civic = require('../lib/civic')

const appId = config.get('civic').appId
const appSecret = config.get('civic').appSecret 
const prvKey = config.get('civic').prvKey

const civicClient = civicSip.newClient({ appId, appSecret, prvKey })

module.exports = {

	home: async function(ctx, next) {
		await ctx.render('home.ejs')
	},

	index: function (ctx, next) {
		ctx.body = "Welcome to Blockchain Auth using Civic";
	},

	view: async function(ctx, next) {
		await ctx.render('index.ejs', {title: 'EJS rendered view'})
	},

	civic: async (civicClient, id) => {
		return await civic.authenticate(civicClient, id)
	}
};