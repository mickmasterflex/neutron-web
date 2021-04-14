const state = {
  bulk_update_day_caps: []
}

const getters = {
  getBulkUpdateDayCaps: state => state.bulk_update_day_caps
}

const actions = {}

const mutations = {
  ADD_DATE_TO_BULK_UPDATE_DAY_CAPS: (state, date) => (state.bulk_update_day_caps.push(date)),
  REMOVE_DATE_TO_BULK_UPDATE_DAY_CAPS: (state, date) => (state.bulk_update_day_caps.splice(state.bulk_update_day_caps.indexOf(date), 1)),
  RESET_BULK_UPDATE_DAY_CAPS: (state) => (state.bulk_update_day_caps = [])
}

export default {
  state,
  getters,
  actions,
  mutations
}
