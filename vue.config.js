const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      axios: 'axios',
      dayjs: 'dayjs',
      echarts: 'echarts',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
    }
  }
})
