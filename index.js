const linkCodeLoader = require('./loader/index')
const devserver = {
  client: {
    overlay: false
  },
  onBeforeSetupMiddleware: function (devServer) {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined')
    }
    const childProcess = require('child_process')
    
    devServer.app.post('/code-link', function (req, res) {
      let postData = '' 
      req.on('data', chunk => {
        postData += chunk.toString() 
      })
      req.on('end', () => {
        const body = JSON.parse(postData)
        if (body.filePath) {
          // 执行vscode定位代码行命令
          if (body.type === 'vsCode') {
            childProcess.exec(`code -r -g ${body.filePath}`)
            console.log(`code -r -g ${body.filePath}`)
          } else if (body.type === 'webStorm') {
            let index = body.filePath.lastIndexOf(':')
            const filePath = body.filePath.substring(0, index)
            childProcess.exec(`webstorm64 ${filePath}`)
            // console.log(`webstorm64 ${filePath}`)
          }
        }
        res.end('打开地址：' + body.filePath)
      })
    })
  }
}
module.exports = {
  devserver,
  linkCodeLoader
}    