
const state = {
  current_breadcrumbs: []
}

const getters = {
  getCurrentBreadCrumbs: state => state.current_breadcrumbs
}

const mutations = {
  SET_CURRENT_BREADCRUMBS: (state, breadcrumbs) => (state.current_breadcrumbs = breadcrumbs),
  RESET_CURRENT_BREADCRUMBS: (state) => (state.current_breadcrumbs = [])
}

export default {
  state,
  getters,
  mutations
}
