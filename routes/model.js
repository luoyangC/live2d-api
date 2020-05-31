const Router = require('koa-router')
const getModel = require('../utils/getModel')
const getTexture = require('../utils/getTexture')

const router = new Router()

router.get('/api/model', async (ctx, next) => {

  const model = await getModel(ctx)
  if (!model) {
    return ctx.body = {
      code: 4004,
      message: 'Not Font'
    }
  }

  const textures = await getTexture(ctx)
  if (textures) {
    model['textures'] = textures
  }

  return ctx.body = model
})

module.exports = router