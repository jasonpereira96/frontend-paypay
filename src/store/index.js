import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let initialAuthState = {
  employee: null,
  loginSuccessful: false,
  token: null
}

let userData = JSON.parse(localStorage.getItem('userData'))
if (userData) {
  initialAuthState = userData
}

export default new Vuex.Store({
  state: {
    auth: initialAuthState
  },
  mutations: {
    login(state, payload) {
      state.auth = payload
      localStorage.setItem('userData', JSON.stringify(payload))
    }, 
    logout(state) {
      state.auth = {
        employee: null,
        loginSuccessful: false,
        token: null
      }
      localStorage.removeItem('userData')
    }
  },
  actions: {
  },
  modules: {
  }
})
