import axios from '@/axios'
import { successfulToast, failedToast } from '@/mixins/toast-messages'

const actions = {
  async removeLocations ({ commit }, location) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.post('/geo-remove-locations/', location, { showSuccessToast: false })
      .then(response => {
        if (response.data.valid_locations.length > 0) {
          successfulToast({ heading: 'Location Successfully Removed', content: response.data.valid_locations })
        }
        if (response.data.invalid_locations.length > 0) {
          failedToast({ heading: 'Invalid Location', content: response.data.invalid_locations })
        }
        if (response.data.wrong_contract_locations.length > 0) {
          failedToast({ heading: 'Location Not Found On This Contract', content: response.data.wrong_contract_locations })
        }
      })
      .finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}

export default {
  actions
}
