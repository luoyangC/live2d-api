const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const requireDirectory = require('require-directory')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const loadModels = require('./utils/loadModels')

const PORT = '22340'

async function start() {

  app.use(cors())
  // middlewares
  app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))

  app.use(json())
  app.use(logger())
  app.use(loadModels())

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // error-handling
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });

  requireDirectory(module, './routes', {
    visit: (obj) => {
      if (obj instanceof Router) app.use(obj.routes())
    }
  })

  app.listen(PORT)

  console.log('Listening on ' +  `http://127.0.0.1:${PORT}`)

}

start()
