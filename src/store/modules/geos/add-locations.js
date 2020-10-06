import axios from '@/axios'

const actions = {
  async addLocations ({ commit }, location) {
    await axios.post('/geo-add-location/', location)
  }
}

export default {
  actions
}
