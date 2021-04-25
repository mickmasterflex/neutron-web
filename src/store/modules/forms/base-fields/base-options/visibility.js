
const state = {
  show_update_base_options_modal: false
}

const getters = {
  getShowUpdateBaseOptionsModal: state => state.show_update_base_options_modal
}

const mutations = {
  SHOW_UPDATE_BASE_OPTIONS_MODAL: (state) => (state.show_update_base_options_modal = true),
  CLOSE_UPDATE_BASE_OPTIONS_MODAL: (state) => (state.show_update_base_options_modal = false)
}

export default {
  state,
  getters,
  mutations
}
