
const state = {
  fields_post_loading: false
}

const getters = {
  getFieldsPostLoading: state => state.fields_post_loading
}

const mutations = {
  SET_FIELDS_POST_LOADING: (state) => (state.fields_post_loading = true),
  RESET_FIELDS_POST_LOADING: (state) => (state.fields_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
