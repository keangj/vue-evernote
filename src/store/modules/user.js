import Auth from '@/apis/auth'
import router from '@/router'

const state = {
  user: null
}

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,
  slug: state => state.user === null ? '未' : state.user.username.charAt(0)
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return Auth.login({ username, password }).then(res => {
      commit('setUser', { user: res.data})
    })
  },
  register({ commit }, { username, password }) {
    return Auth.register({ username, password }).then(res => {
      commit('setUser', { user: res.data})
    })
  },
  checkLogin({ commit, state }, payload) {
    if (state.user !== null) return Promise.resolve()
    return Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.push(payload)
      } else {
        commit('setUser', { user: res.data })
      }
    })
  },
  logout({ commit }, payload = { path: '/login' }) {
    Auth.logout().then(res => {
      commit('setUser', { user: null })
      commit('setNotes', { notes: null })
      commit('setNotebooks', { notebooks: null })
      commit('setCurNoteId', { curNoteId: null })
      commit('setCurBookId', { curBookId: null })
    })
    router.push(payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
