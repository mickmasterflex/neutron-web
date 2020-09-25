const state = {
  show_create_day_cap_modal: false,
  show_update_day_cap_modal: false
}

const getters = {
  getShowCreateDayCapModal: state => state.show_create_day_cap_modal,
  getShowUpdateDayCapModal: state => state.show_update_day_cap_modal
}

const mutations = {
  SHOW_CREATE_DAY_CAP_MODAL: (state) => (state.show_create_day_cap_modal = true),
  CLOSE_CREATE_DAY_CAP_MODAL: (state) => (state.show_create_day_cap_modal = false),
  SHOW_UPDATE_DAY_CAP_MODAL: (state) => (state.show_update_day_cap_modal = true),
  CLOSE_UPDATE_DAY_CAP_MODAL: (state) => (state.show_update_day_cap_modal = false)
}

export default {
  state,
  getters,
  mutations
}
