import axios from '@/axios'
import loading from '@/store/modules/verticals/loading.js'

const modules = {
  loading
}
const state = {
  verticals: []
}
const getters = {
  getAllVerticals: state => state.verticals
}
const actions = {
  async fetchVerticals ({ commit }) {
    commit('SET_VERTICALS_FETCH_LOADING')
    await axios.get('/verticals/')
      .then(response => {
        commit('SET_VERTICALS', response.data)
      })
      .finally(() => {
        commit('RESET_VERTICALS_FETCH_LOADING')
      })
  }
}
const mutations = {
  SET_VERTICALS: (state, verticals) => (state.verticals = verticals)
}

export default {
  state,
  mutations,
  modules,
  actions,
  getters
}
