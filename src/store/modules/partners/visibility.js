const state = {
  show_create_partner_modal: false
}
const getters = {
  getShowCreatePartnerModal: state => state.show_create_partner_modal
}
const mutations = {
  SHOW_CREATE_PARTNER_MODAL: (state) => (state.show_create_partner_modal = true),
  CLOSE_CREATE_PARTNER_MODAL: (state) => (state.show_create_partner_modal = false)
}

export default {
  state,
  getters,
  mutations
}
