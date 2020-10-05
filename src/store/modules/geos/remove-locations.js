import axios from '@/axios'

const actions = {
  async removeLocations ({ commit }, location) {
    await axios.post('/geo-remove-location/', location)
  }
}

export default {
  actions
}
