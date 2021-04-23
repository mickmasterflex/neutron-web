
const state = {
  caps_post_loading: false
}

const getters = {
  getCapsPostLoading: state => state.caps_post_loading
}

const mutations = {
  SET_CAPS_POST_LOADING: (state) => (state.caps_post_loading = true),
  RESET_CAPS_POST_LOADING: (state) => (state.caps_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
