const state = {
  bulk_update_offer_status_post_loading: false
}

const getters = {
  getBulkUpdateOfferStatusPostLoading: state => state.bulk_update_offer_status_post_loading
}

const mutations = {
  SET_BULK_UPDATE_OFFER_STATUS_POST_LOADING: (state) => (state.bulk_update_offer_status_post_loading = true),
  RESET_BULK_UPDATE_OFFER_STATUS_POST_LOADING: (state) => (state.bulk_update_offer_status_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
