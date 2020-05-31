const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'mall mock server'
  }
})

module.exports = router
