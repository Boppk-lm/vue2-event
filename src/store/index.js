import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/storage'
// 也可以使用插件进行token本地存储
// import createPersostedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() // ''
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken (state, newtoken) {
      state.token = newtoken
    }
  },
  actions: {
  },
  modules: {
  } // ,
  // plugins: [createPersostedState()]
})
