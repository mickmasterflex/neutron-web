
const state = {
  show_update_base_option_field_modal: false
}

const getters = {
  getShowUpdateBaseOptionFieldModal: state => state.show_update_base_option_field_modal
}

const mutations = {
  SHOW_UPDATE_BASE_OPTION_FIELD_MODAL: (state) => (state.show_update_base_option_field_modal = true),
  CLOSE_UPDATE_BASE_OPTION_FIELD_MODAL: (state) => (state.show_update_base_option_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
