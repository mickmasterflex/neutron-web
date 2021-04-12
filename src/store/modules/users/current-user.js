import axios from '@/axios'
import router from '@/router'

const modules = {
}

const state = {
  current_active_user: null
}

const getters = {
  getCurrentActiveUser: state => state.current_active_user
}

const actions = {
  async fetchCurrentActiveUser ({ commit }) {
    await axios.get('/current-user/')
      .then(response => {
        commit('SET_CURRENT_ACTIVE_USER', response.data)
        if (!state.current_active_user.pass_valid) {
          router.push({ name: 'ResetPassword' })
        }
      })
  }
}

const mutations = {
  SET_CURRENT_ACTIVE_USER: (state, user) => (state.current_active_user = user)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
