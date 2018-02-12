const Router = require('koa-router')
const router = new Router();

module.exports = function (app) {

	const indexCtrl = require('../controllers/index');

	router
		.get('/', indexCtrl.home)
		// .get('/', (ctx, next) => {
		// ctx.body = 'Hello World'
		// })

		.get('/users', indexCtrl.index)

		.get('/link/:id', (ctx, next) => {
			console.log('/link/' + ctx.params.id)
			ctx.body = "Get value from params : " + ctx.params.id
		})

		.get('/render/view', indexCtrl.view)
	// .get('/view/:id', indexCtrl.test);

	app
		.use(router.routes())
		.use(router.allowedMethods());

};