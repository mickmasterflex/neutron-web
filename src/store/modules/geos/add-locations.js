import axios from '@/axios'
import { successfulToast } from '@/mixins/toast-messages'

const actions = {
  async addLocations ({ commit }, location, getters) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.post('/geo-add-locations/', location, { showSuccessToast: false })
      .then(response => {
        successfulToast({ heading: 'Valid Locations', content: response.data.valid_locations })
      }).finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}

export default {
  actions
}
