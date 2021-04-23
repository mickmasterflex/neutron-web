
const state = {
  base_fields_post_loading: false
}

const getters = {
  getBaseFieldsPostLoading: state => state.base_fields_post_loading
}

const mutations = {
  SET_BASE_FIELDS_POST_LOADING: (state) => (state.base_fields_post_loading = true),
  RESET_BASE_FIELDS_POST_LOADING: (state) => (state.base_fields_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
