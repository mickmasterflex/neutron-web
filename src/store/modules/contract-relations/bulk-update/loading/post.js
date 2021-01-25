const state = {
  bulk_update_suppressions_post_loading: false,
  bulk_update_suppressions_post_loading_text: 'Updating Suppressions'
}

const getters = {
  getBulkUpdateSuppressionsPostLoading: state => state.bulk_update_suppressions_post_loading,
  getBulkUpdateSuppressionsPostLoadingText: state => state.bulk_update_suppressions_post_loading_text
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
