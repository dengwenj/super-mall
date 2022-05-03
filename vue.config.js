const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/mixins.less'),
        path.resolve(__dirname, 'src/assets/styles/theme.less')
      ]
    }
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  // 防止将某些 improt 的包打包到 bundle 中，而是在运行时再去从外部获取这些扩展依赖， cdn
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
})
