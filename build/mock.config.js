const fs = require('fs')
const path = require('path')

const mockBaseURL = '//note-server.hunger-valley.com'
const realBaseURL = '//note-server.hunger-valley.com'

exports.config = function({isDEV = true} = {isDEV: true}) {
  let fileTxt = `
    module.exports = {
      baseURL: '${isDEV ? mockBaseURL : realBaseURL}'
    }
  `
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)
}
