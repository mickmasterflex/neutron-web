
const state = {
  show_create_campus_modal: false
}

const getters = {
  getShowCreateCampusModal: state => state.show_create_campus_modal
}

const mutations = {
  SHOW_CREATE_CAMPUS_MODAL: (state) => (state.show_create_campus_modal = true),
  CLOSE_CREATE_CAMPUS_MODAL: (state) => (state.show_create_campus_modal = false)
}

export default {
  state,
  getters,
  mutations
}
