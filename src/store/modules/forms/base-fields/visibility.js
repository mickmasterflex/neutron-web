
const state = {
  show_create_base_field_modal: false,
}

const getters = {
  getShowCreateBaseFieldModal: state => state.show_create_base_field_modal
}

const mutations = {
  SHOW_CREATE_BASE_FIELD_MODAL: (state) => (state.show_create_base_field_modal = true),
  CLOSE_CREATE_BASE_FIELD_MODAL: (state) => (state.show_create_base_field_modal = false)
}

export default {
  state,
  getters,
  mutations
}
