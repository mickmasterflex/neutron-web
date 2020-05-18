const state = {
  current_options: []
}

const getters = {
  getCurrentOptions: state => state.current_options
}

const actions = {}

const mutations = {
  SET_CURRENT_OPTIONS: (state, options) => (state.current_options = options)
}

export default {
  state,
  getters,
  actions,
  mutations
}
