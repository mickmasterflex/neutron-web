
const state = {
  show_update_field_modal: false
}

const getters = {
  getShowUpdateFieldModal: state => state.show_update_field_modal
}

const mutations = {
  SHOW_UPDATE_FIELD_MODAL: (state) => (state.show_update_field_modal = true),
  CLOSE_UPDATE_TEXT_FIELD_MODAL: (state) => (state.show_update_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
