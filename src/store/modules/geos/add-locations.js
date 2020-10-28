import axios from '@/axios'

const actions = {
  async addLocations ({ commit }, location) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.post('/geo-add-locations/', location)
      .finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}

export default {
  actions
}
