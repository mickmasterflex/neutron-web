
const state = {
  reasons_delete_loading: false,
  reasons_delete_loading_text: 'Deleting Reason'
}

const getters = {
  getReasonsDeleteLoading: state => state.reasons_delete_loading,
  getReasonsDeleteLoadingText: state => state.reasons_delete_loading_text
}

const mutations = {
  SET_REASONS_DELETE_LOADING: (state) => (state.reasons_delete_loading = true),
  RESET_REASONS_DELETE_LOADING: (state) => (state.reasons_delete_loading = false)
}

export default {
  state,
  getters,
  mutations
}
