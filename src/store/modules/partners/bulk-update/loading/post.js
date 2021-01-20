const state = {
  bulk_update_partner_status_post_loading: false
}

const getters = {
  getBulkUpdatePartnerStatusPostLoading: state => state.bulk_update_partner_status_post_loading
}

const mutations = {
  SET_BULK_UPDATE_PARTNER_STATUS_POST_LOADING: (state) => (state.bulk_update_partner_status_post_loading = true),
  RESET_BULK_UPDATE_PARTNER_STATUS_POST_LOADING: (state) => (state.bulk_update_partner_status_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
