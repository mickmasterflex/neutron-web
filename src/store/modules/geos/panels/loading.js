const state = {
  geo_panel_loading: false
}

const getters = {
  getGeoPanelLoading: state => state.geo_panel_loading
}

const mutations = {
  SET_GEO_PANEL_LOADING: (state) => (state.geo_panel_loading = true),
  RESET_GEO_PANEL_LOADING: (state) => (state.geo_panel_loading = false)
}

export default {
  state,
  getters,
  mutations
}
