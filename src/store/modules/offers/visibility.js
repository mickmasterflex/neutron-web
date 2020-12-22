
const state = {
  show_create_offer_modal: false
}

const getters = {
  getShowCreateOfferModal: state => state.show_create_offer_modal
}

const mutations = {
  SHOW_CREATE_OFFER_MODAL: (state) => (state.show_create_offer_modal = true),
  CLOSE_CREATE_OFFER_MODAL: (state) => (state.show_create_offer_modal = false)
}

export default {
  state,
  getters,
  mutations
}
