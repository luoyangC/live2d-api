const path = require('path');
const fs = require('fs');

async function loadModels (ctx, next) {
    const file = fs.readFileSync(path.join(__dirname, '../models.json'), 'utf8')
    const models = JSON.parse(file)
    ctx['models'] = models.models
    await next()
}

module.exports = function () {
  return loadModels
}