import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
import '@/utils/element'
// 全局导入富文本编辑器

import VueQuillEditor from 'vue-quill-editor'

// 富文本编辑器样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// 导入时间插件
import dayjs from 'dayjs'
// 时间插件挂载到对象原型上
Vue.prototype.$formatDate = (dateobj) => {
  return dayjs(dateobj).format('YYYY-MM-DD HH:mm:ss')
}
// 初始化富文本编辑器
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
