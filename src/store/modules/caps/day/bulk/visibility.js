const state = {
  show_bulk_day_cap_modal: false
}

const getters = {
  getShowBulkDayCapModal: state => state.show_bulk_day_cap_modal
}

const mutations = {
  SHOW_BULK_DAY_CAP_MODAL: (state) => (state.show_bulk_day_cap_modal = true),
  CLOSE_BULK_DAY_CAP_MODAL: (state) => (state.show_bulk_day_cap_modal = false)
}

export default {
  state,
  getters,
  mutations
}
