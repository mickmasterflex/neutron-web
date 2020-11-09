import axios from '@/axios'

const state = {
  channels: [],
  current_channel: {},
  channels_fetch_loading: false,
  show_create_channel_modal: false
}

const getters = {
  getCurrentChannel: state => state.current_channel,
  getAllChannels: state => state.channels,
  getChannelsFetchLoading: state => state.channels_fetch_loading,
  getShowCreateChannelModal: state => state.show_create_channel_modal
}

const actions = {
  async fetchChannels ({ commit }) {
    await axios.get('/channels/')
      .then(response => {
        commit('SET_CHANNELS', response.data)
        commit('RESET_CHANNELS_FETCH_LOADING')
      })
  },
  async fetchCurrentChannel ({ commit }, id) {
    await axios.get(`/channels/${id}/`)
      .then(response => {
        commit('SET_CURRENT_CHANNEL', response.data)
      })
  },
  async createChannel ({ commit }, channel) {
    await axios.post('/channels/', channel)
      .then(response => {
        commit('ADD_CHANNEL', response.data)
      })
  },
  async updateChannel ({ commit }, updatedChannel) {
    await axios.put(`/channels/${updatedChannel.id}/`, updatedChannel)
      .then(response => {
        commit('UPDATE_CHANNEL', response.data)
        commit('SET_CURRENT_CHANNEL', response.data)
      })
  },
  async deleteChannel ({ commit }, id) {
    await axios.delete(`/channels/${id}/`)
      .then(() => {
        commit('REMOVE_CHANNEL', id)
      })
  }
}

const mutations = {
  SET_CHANNELS: (state, channels) => (state.channels = channels),
  SET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = true),
  RESET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = false),
  SET_CURRENT_CHANNEL: (state, channel) => (state.current_channel = channel),
  ADD_CHANNEL: (state, channel) => state.channels.unshift(channel),
  UPDATE_CHANNEL: (state, updatedChannel) => {
    const index = state.channels.findIndex(channel => channel.id === updatedChannel.id)
    if (index !== -1) {
      state.channels.splice(index, 1, updatedChannel)
    }
  },
  REMOVE_CHANNEL: (state, id) => (state.channels = state.channels.filter(channel => channel.id !== id)),
  SHOW_CREATE_CHANNEL_MODAL: (state) => (state.show_create_channel_modal = true),
  CLOSE_CREATE_CHANNEL_MODAL: (state) => (state.show_create_channel_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
