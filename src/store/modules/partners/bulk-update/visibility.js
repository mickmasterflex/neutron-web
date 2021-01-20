
const state = {
  show_bulk_update_partner_status: false
}

const getters = {
  getShowBulkUpdatePartnerStatus: state => state.show_bulk_update_partner_status
}

const mutations = {
  SHOW_BULK_UPDATE_PARTNER_STATUS: (state) => (state.show_bulk_update_partner_status = true),
  CLOSE_BULK_UPDATE_PARTNER_STATUS: (state) => (state.show_bulk_update_partner_status = false)
}

export default {
  state,
  getters,
  mutations
}
