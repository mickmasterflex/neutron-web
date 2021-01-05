import axios from '@/axios'
import visibility from '@/store/modules/channels/visibility'
import loading from '@/store/modules/channels/loading'

const modules = {
  loading,
  visibility
}

const state = {
  channels: [],
  current_channel: {}
}

const getters = {
  getCurrentChannel: state => state.current_channel,
  getAllChannels: state => state.channels
}

const actions = {
  async fetchChannels ({ commit }) {
    commit('SET_CHANNELS_FETCH_LOADING')
    await axios.get('/channels/')
      .then(response => {
        commit('SET_CHANNELS', response.data)
        commit('RESET_CHANNELS_FETCH_LOADING')
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
  SET_CURRENT_CHANNEL: (state, channel) => (state.current_channel = channel),
  ADD_CHANNEL: (state, channel) => state.channels.unshift(channel),
  UPDATE_CHANNEL: (state, updatedChannel) => {
    const index = state.channels.findIndex(channel => channel.id === updatedChannel.id)
    if (index !== -1) {
      state.channels.splice(index, 1, updatedChannel)
    }
  },
  REMOVE_CHANNEL: (state, id) => (state.channels = state.channels.filter(channel => channel.id !== id))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
