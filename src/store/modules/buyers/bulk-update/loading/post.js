const state = {
  bulk_update_buyer_status_post_loading: false
}

const getters = {
  getBulkUpdateBuyerStatusPusLoading: state => state.bulk_update_buyer_status_post_loading
}

const mutations = {
  SET_BULK_UPDATE_BUYER_STATUS_POST_LOADING: (state) => (state.bulk_update_buyer_status_post_loading = true),
  RESET_BULK_UPDATE_BUYER_STATUS_POST_LOADING: (state) => (state.bulk_update_buyer_status_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
