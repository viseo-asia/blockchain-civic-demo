const Router = require('koa-router')
const router = new Router();

const Lynx = require('lynx')
const metrics = new Lynx('telegraf', 8125)

module.exports = function (app) {

	const indexCtrl = require('../controllers/index');

	router
		// .get('/', indexCtrl.home)
		.get('/', (ctx, next) => {
			// ctx.body = 'Hello World'
			metrics.increment('page.home')
			return indexCtrl.home(ctx, next)
		})

		.get('/users', indexCtrl.index)

		.get('/link/:id', (ctx, next) => {
			console.log('/link/' + ctx.params.id)
			ctx.body = "Get value from params : " + ctx.params.id
		})

		.get('/render/view', indexCtrl.view)
		// .get('/view/:id', indexCtrl.test);

		.get('/civic/:id', ctx => {
			console.log(101, ctx.params.id)
			ctx.body = indexCtrl.civic(ctx.params.id)
		})

	app
		.use(router.routes())
		.use(router.allowedMethods());

};