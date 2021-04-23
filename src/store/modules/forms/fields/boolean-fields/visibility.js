
const state = {
  show_update_boolean_field_modal: false
}

const getters = {
  getShowUpdateBooleanFieldModal: state => state.show_update_boolean_field_modal
}

const mutations = {
  SHOW_UPDATE_BOOLEAN_FIELD_MODAL: (state) => (state.show_update_boolean_field_modal = true),
  CLOSE_UPDATE_BOOLEAN_FIELD_MODAL: (state) => (state.show_update_boolean_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
