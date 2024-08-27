import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/storage'
import { getUser } from '@/api/user'
// 也可以使用插件进行token本地存储
// import createPersostedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    userinfo: {}
  },
  getters: {
    // 用户名
    username (state) {
      return state.userinfo.username
    },
    // 用户昵称
    nickname (state) {
      return state.userinfo.nickname
    },
    // 用户头像
    user_pic (state) {
      return state.userinfo.user_pic
    },
    // id
    id (state) {
      return state.userinfo.id
    }
  },
  mutations: {
    // 保存token
    updateToken (state, newtoken) {
      state.token = newtoken
    },
    // 保存用户信息
    updateuser (state, user) {
      state.userinfo = user
    }
  },
  actions: {
    // 请求用户信息 保存到vuex
    async getUserinfo (store) {
      const { data: { data: res } } = await getUser()
      store.commit('updateuser', res)
    }
  },
  modules: {
  } // ,
  // plugins: [createPersostedState()]
})
