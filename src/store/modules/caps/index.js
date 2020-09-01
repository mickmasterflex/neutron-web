import axios from '@/axios'
import dayCaps from '@/store/modules/caps/day'

const modules = {
  dayCaps
}

const state = {
  current_caps: []
}

const getters = {
  getCurrentCaps: state => state.current_day_caps
}

const actions = {
  async fetchCaps ({ commit }, id) {
    await axios.get(`/caps/${id}`)
      .then(response => {
        commit('SET_CAPS', response.data)
      })
  }
}

const mutations = {
  SET_CAPS: (state, caps) => (state.current_caps = caps)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
