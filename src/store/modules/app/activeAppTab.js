const state = {
  activeAppTab: ''
}

const getters = {
  getActiveAppTab: state => state.activeAppTab
}

const mutations = {
  SET_ACTIVE_APP_TAB: (state, tab) => (state.activeAppTab = tab)
}

export default {
  state,
  getters,
  mutations
}
