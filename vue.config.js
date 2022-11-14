const { defineConfig } = require('@vue/cli-service')

// 取随机数
const port = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/ecology/',
  devServer: {
    open: true,
    port: port,
    host: '127.0.0.1',
    proxy: {
      '/stj': {
        // target: 'http://47.95.147.89/stj',
        target: 'http://127.0.0.1:8096/stj',
        changeOrigin: true,
        pathRewrite: {
          '^/stj': ''
        }
      }
    }
  }
})
