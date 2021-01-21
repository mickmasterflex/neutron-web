const state = {
  bulk_update_suppressions_post_loading: false
}

const getters = {
  getBulkUpdateSuppressionsPostLoading: state => state.bulk_update_suppressions_post_loading
}

const mutations = {
  SET_BULK_UPDATE_SUPPRESSIONS_POST_LOADING: (state) => (state.bulk_update_suppressions_post_loading = true),
  RESET_BULK_UPDATE_SUPPRESSIONS_POST_LOADING: (state) => (state.bulk_update_suppressions_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
