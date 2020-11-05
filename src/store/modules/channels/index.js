import axios from '@/axios'

const state = {
  channels: [],
  channels_fetch_loading: false
}

const getters = {
  getAllChannels: state => state.channels,
  getChannelsFetchLoading: state => state.channels_fetch_loading
}

const actions = {
  async fetchChannels ({ commit }) {
    await axios.get('/channels/')
      .then(response => {
        commit('SET_CHANNELS', response.data)
        commit('RESET_CHANNELS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CHANNELS: (state, channels) => (state.channels = channels),
  SET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = true),
  RESET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
