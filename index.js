const Koa = require('koa')
const Router = require('koa-router')
const routes = require('./app/routes')
// const path = require('path')
const views = require('koa-views')
const config = require('config')
// serve = require('koa-static');

const app = new Koa();
const router = new Router()

// simple logger
//TODO use koa-json-logger or similar
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.response.status} ${ctx.url} - ${ms}`);
});

// initialize render helper
app.use(views(config.template.path, config.template.options));
routes(app)

// 404
//TODO check for and handle json response
app.use(async ctx => {
    ctx.status = 404
    // text/html
    ctx.body = "Oops! Page Not Found"
})

app.listen(3000, console.log(`HTTP server listening on port ${config.server.port}...`))