import axios from '@/axios'
const state = {
  channels: []
}

const getters = {
  getAllChannels: state => state.channels
}

const actions = {
  async fetchChannels ({ commit }) {
    await axios.get('/channels/')
      .then(response => {
        commit('SET_CHANNELS', response.data)
      })
  }
}

const mutations = {
  SET_CHANNELS: (state, channels) => (state.channels = channels)
}

export default {
  state,
  getters,
  actions,
  mutations
}
