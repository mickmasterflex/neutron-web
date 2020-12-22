
const state = {
  clients_fetch_loading: false
}

const getters = {
  getClientsFetchLoading: state => state.clients_fetch_loading
}

const mutations = {
  SET_CLIENTS_FETCH_LOADING: (state) => (state.clients_fetch_loading = true),
  RESET_CLIENTS_FETCH_LOADING: (state) => (state.clients_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
