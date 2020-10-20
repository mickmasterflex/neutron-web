import axios from '@/axios'

const actions = {
  async removeLocations ({ commit }, location) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.post('/geo-remove-location/', location)
      .finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}

export default {
  actions
}
