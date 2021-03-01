const state = {
  bulk_update_offers_shift_click_index: null
}

const getters = {
  getBulkUpdateOffersShiftClickIndex: state => state.bulk_update_offers_shift_click_index
}

const mutations = {
  SET_BULK_UPDATE_OFFERS_SHIFT_CLICK_INDEX: (state, index) => (state.bulk_update_offers_shift_click_index = index),
  RESET_BULK_UPDATE_OFFERS_SHIFT_CLICK_INDEX: (state) => (state.bulk_update_offers_shift_click_index = null)
}

export default {
  state,
  getters,
  mutations
}
