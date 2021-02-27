
const state = {
  show_bulk_update_offer_status: false
}

const getters = {
  getShowBulkUpdateOfferStatus: state => state.show_bulk_update_offer_status
}

const mutations = {
  SHOW_BULK_UPDATE_OFFER_STATUS: (state) => (state.show_bulk_update_offer_status = true),
  CLOSE_BULK_UPDATE_OFFER_STATUS: (state) => (state.show_bulk_update_offer_status = false)
}

export default {
  state,
  getters,
  mutations
}
