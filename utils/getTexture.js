const axios = require('axios');

async function getTexture (ctx) {
  
  const { cdn = 'https://cdn.luoyangc.cn/live2d/model/', name = 'BiliBili/22', texture = '' } = ctx.query

  const model = name.replace(/\/|\-|\.|\&/, '/')

  if (!texture) {
    return false
  }

  try {
    const { data } = await axios.get(`${cdn}${model}/textures_list.json`)
    const textureList = data.list
    const textures = textureList.find(item => Object.keys(item)[0] === texture)
    return textures[texture]
  } catch (error) {
    return false
  }
}

module.exports = getTexture