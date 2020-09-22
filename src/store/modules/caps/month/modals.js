
const state = {
  current_month_caps: null,
  current_month_date: '',
  selected_cap_month: null,
  show_create_month_cap_modal: false,
  show_update_month_cap_modal: false
}

const getters = {
  getShowCreateMonthCapModal: state => state.show_create_month_cap_modal,
  getShowUpdateMonthCapModal: state => state.show_update_month_cap_modal
}

const mutations = {
  SHOW_CREATE_MONTH_CAP_MODAL: (state) => (state.show_create_month_cap_modal = true),
  CLOSE_CREATE_MONTH_CAP_MODAL: (state) => (state.show_create_month_cap_modal = false),
  SHOW_UPDATE_MONTH_CAP_MODAL: (state) => (state.show_update_month_cap_modal = true),
  CLOSE_UPDATE_MONTH_CAP_MODAL: (state) => (state.show_update_month_cap_modal = false)
}

export default {
  state,
  getters,
  mutations
}
