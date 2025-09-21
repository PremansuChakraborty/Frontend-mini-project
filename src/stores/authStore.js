
import { createStore } from 'vuex'
import router from '../routes/index.js'  

const store = createStore({
  state: {
    isLoggedIn: false,
    adminEmail: '',
    adminEmailValidate: 'admin@gmail.com',
    adminPasswordValidate: 'Admin1234'
  },
  mutations: {
    SET_LOGIN(state, email) {
      state.isLoggedIn = true
      state.adminEmail = email
    },
    SET_LOGOUT(state) {
      state.isLoggedIn = false
      state.adminEmail = ''
    }
  },
  actions: {
    login({ commit, state }, { email, password }) {
      if (email === state.adminEmailValidate && password === state.adminPasswordValidate) {
        commit('SET_LOGIN', email)
        return true
      }
      return false
    },
    logout({ commit }) {
      commit('SET_LOGOUT')
      router.push('/')
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    adminEmail: (state) => state.adminEmail
  }
})

export default store
