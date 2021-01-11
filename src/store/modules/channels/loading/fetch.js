
const state = {
  channels_fetch_loading: false,
  channels_fetch_loading_text: 'Loading Channels'
}

const getters = {
  getChannelsFetchLoading: state => state.channels_fetch_loading,
  getChannelsFetchLoadingText: state => state.channels_fetch_loading_text
}

const mutations = {
  SET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = true),
  RESET_CHANNELS_FETCH_LOADING: (state) => (state.channels_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
