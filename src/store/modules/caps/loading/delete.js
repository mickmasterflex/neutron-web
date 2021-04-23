
const state = {
  caps_delete_loading: false
}

const getters = {
  getCapsDeleteLoading: state => state.caps_delete_loading
}

const mutations = {
  SET_CAPS_DELETE_LOADING: (state) => (state.caps_delete_loading = true),
  RESET_CAPS_DELETE_LOADING: (state) => (state.caps_delete_loading = false)
}

export default {
  state,
  getters,
  mutations
}
