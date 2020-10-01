const state = {
  add_locations_panel_visible: true,
  remove_locations_panel_visible: false,
  search_locations_panel_visible: false
}

const actions = {
  showAddLocationsPanel: ({ commit }) => {
    commit('SET_ADD_LOCATIONS_VISIBLE')
    commit('UNSET_REMOVE_LOCATIONS_VISIBLE')
    commit('UNSET_SEARCH_LOCATIONS_VISIBLE')
  },
  showRemoveLocationsPanel: ({ commit }) => {
    commit('SET_REMOVE_LOCATIONS_VISIBLE')
    commit('UNSET_ADD_LOCATIONS_VISIBLE')
    commit('UNSET_SEARCH_LOCATIONS_VISIBLE')
  },
  showSearchLocationsPanel: ({ commit }) => {
    commit('SET_SEARCH_LOCATIONS_VISIBLE')
    commit('UNSET_ADD_LOCATIONS_VISIBLE')
    commit('UNSET_REMOVE_LOCATIONS_VISIBLE')
  }
}

const getters = {
  getAddLocationsPanelVisible: state => state.add_locations_panel_visible,
  getRemoveAddLocationsPanelVisible: state => state.remove_locations_panel_visible,
  getSearchAddLocationsPanelVisible: state => state.search_locations_panel_visible
}

const mutations = {
  SET_ADD_LOCATIONS_VISIBLE: (state) => (state.add_locations_panel_visible = true),
  SET_REMOVE_LOCATIONS_VISIBLE: (state) => (state.remove_locations_panel_visible = true),
  SET_SEARCH_LOCATIONS_VISIBLE: (state) => (state.search_locations_panel_visible = true),
  UNSET_ADD_LOCATIONS_VISIBLE: state => (state.add_locations_panel_visible = false),
  UNSET_REMOVE_LOCATIONS_VISIBLE: state => (state.remove_locations_panel_visible = false),
  UNSET_SEARCH_LOCATIONS_VISIBLE: state => (state.search_locations_panel_visible = false)
}

export default {
  state,
  actions,
  getters,
  mutations
}
