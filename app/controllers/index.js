module.exports = {

	home: async function(ctx, next) {
		await ctx.render('home.ejs')
	},

	index: function (ctx, next) {
		ctx.body = "Welcome to koajs-starter";
	},

	view: async function(ctx, next) {
		// yield this.render('index.ejs', {
			// title: 'Render view template'
		// });
		// yield next;
		await ctx.render('index.ejs', {title: 'EJS rendered view'})
	}

	// test: function *(next, id) {
	// this.body = "Get param from controller : "+this.params.id;
	// }
};