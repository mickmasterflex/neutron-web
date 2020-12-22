
const state = {
  clients_fetch_loading: false,
  client_fetch_loading: false,
  client_fetch_loading_text: 'Loading Client Data'
}

const getters = {
  getClientsFetchLoading: state => state.clients_fetch_loading,
  getClientFetchLoading: state => state.client_fetch_loading,
  getClientFetchLoadingText: state => state.client_fetch_loading_text
}

const mutations = {
  SET_CLIENTS_FETCH_LOADING: (state) => (state.clients_fetch_loading = true),
  RESET_CLIENTS_FETCH_LOADING: (state) => (state.clients_fetch_loading = false),
  SET_CLIENT_FETCH_LOADING: (state) => (state.client_fetch_loading = true),
  RESET_CLIENT_FETCH_LOADING: (state) => (state.client_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
