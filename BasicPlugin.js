const fs = require('fs')
class BasicPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap('BasicPlugin', stats => {
      const {
        startTime,
        endTime,
        hash
      } = stats
      console.log('hash：' + hash)
      console.log('time：' + (endTime - startTime) + 'ms')
      const timer = parseInt(endTime / 1000) - parseInt(startTime / 1000)
      console.log(timer)
      console.log('打包结束')
      fs.writeFileSync(
        './dist/config.xml',
        fs.readFileSync('./config.xml')
      )
      // fs.createReadStream('./config.xml', {
      //   highWaterMark: 1024 * 1024 * 5
      // }).pipe(fs.createWriteStream('../admin-server/static.zip'))
      console.log('移动文件成功')
    })
  }
}
module.exports = BasicPlugin
