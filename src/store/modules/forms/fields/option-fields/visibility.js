
const state = {
  show_update_option_field_modal: false
}

const getters = {
  getShowUpdateOptionFieldModal: state => state.show_update_option_field_modal
}

const mutations = {
  SHOW_UPDATE_OPTION_FIELD_MODAL: (state) => (state.show_update_option_field_modal = true),
  CLOSE_UPDATE_OPTION_FIELD_MODAL: (state) => (state.show_update_option_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
