const state = {
  activeApp: ''
}

const getters = {
  getActiveApp: state => state.activeApp
}

const mutations = {
  SET_ACTIVE_APP: (state, app) => (state.activeApp = app),
  RESET_ACTIVE_APP: (state) => (state.activeApp = '')
}

export default {
  state,
  getters,
  mutations
}
