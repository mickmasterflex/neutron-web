import axios from '@/axios'
import { successfulToast, failedToast } from '@/mixins/toast-messages'

const actions = {
  async addLocations ({ commit }, location) {
    commit('SET_GEO_PANEL_LOADING')
    await axios.post('/geo-add-locations/', location, { showSuccessToast: false })
      .then(response => {
        if (response.data.valid_locations.length > 0) {
          successfulToast({ heading: 'Location Added Successfully', content: response.data.valid_locations })
        }
        if (response.data.invalid_locations.length > 0) {
          failedToast({ heading: 'Invalid Location', content: response.data.invalid_locations })
        }
        if (response.data.inherited_locations.length > 0) {
          failedToast({ heading: 'Locations Already Inherited', content: response.data.inherited_locations })
        }
      }).finally(() => {
        commit('RESET_GEO_PANEL_LOADING')
      })
  }
}
export default {
  actions
}
