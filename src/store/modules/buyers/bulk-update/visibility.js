
const state = {
  show_bulk_update_buyer_status: false
}

const getters = {
  getShowBulkUpdateBuyerStatus: state => state.show_bulk_update_buyer_status
}

const mutations = {
  SHOW_BULK_UPDATE_BUYER_STATUS: (state) => (state.show_bulk_update_buyer_status = true),
  CLOSE_BULK_UPDATE_BUYER_STATUS: (state) => (state.show_bulk_update_buyer_status = false)
}

export default {
  state,
  getters,
  mutations
}
