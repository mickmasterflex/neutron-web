
const state = {
  deliveries_fetch_loading: false,
  deliveries_fetch_loading_text: 'Loading Deliveries'
}

const getters = {
  getDeliveriesFetchLoading: state => state.deliveries_fetch_loading,
  getDeliveriesFetchLoadingText: state => state.deliveries_fetch_loading_text
}

const mutations = {
  SET_DELIVERIES_FETCH_LOADING: (state) => (state.deliveries_fetch_loading = true),
  RESET_DELIVERIES_FETCH_LOADING: (state) => (state.deliveries_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
