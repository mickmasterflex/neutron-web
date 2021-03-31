
const state = {
  buyer_revenue_method_put_loading: false,
  buyer_revenue_method_put_loading_text: 'Setting Revenue Method'
}

const getters = {
  getBuyerRevenueMethodPutLoading: state => state.buyer_revenue_method_put_loading,
  getBuyerRevenueMethodPutLoadingText: state => state.buyer_revenue_method_put_loading_text
}

const mutations = {
  SET_BUYER_REVENUE_METHOD_PUT_LOADING: (state) => (state.buyer_revenue_method_put_loading = true),
  RESET_BUYER_REVENUE_METHOD_PUT_LOADING: (state) => (state.buyer_revenue_method_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
