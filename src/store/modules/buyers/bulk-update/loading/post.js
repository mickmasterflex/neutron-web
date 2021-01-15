const state = {
  bulk_update_buyer_status_put_loading: false
}

const getters = {
  getBulkUpdateBuyerStatusPusLoading: state => state.bulk_update_buyer_status_put_loading
}

const mutations = {
  SET_BULK_UPDATE_BUYER_STATUS_PUT_LOADING: (state) => (state.bulk_update_buyer_status_put_loading = true),
  RESET_BULK_UPDATE_BUYER_STATUS_PUT_LOADING: (state) => (state.bulk_update_buyer_status_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
