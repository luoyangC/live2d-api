const axios = require('axios');

async function getModel (ctx) {
  
  const { cdn = 'https://cdn.luoyangc.cn/live2d/model/', name = 'BiliBili/22' } = ctx.query

  const model = name.replace(/\/|\-|\.|\&/, '/')

  if (ctx.models.every((item) => item !== model)) {
    return false
  }

  try {
    const { data } = await axios.get(`${cdn}${model}/index.json`)
    return {...data, base_url: cdn + model + '/'}
  } catch (error) {
    return false
  }

}

module.exports = getModel