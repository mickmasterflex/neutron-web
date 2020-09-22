import axios from '@/axios'

const state = {
  current_month_caps: null,
  current_month_date: '',
  selected_cap_month: null,
  show_create_month_cap_modal: false,
  show_update_month_cap_modal: false
}

const getters = {
  getCurrentMonthCaps: state => state.current_month_caps,
  getSelectedCapMonth: state => state.selected_cap_month,
  getCurrentMonth: state => state.current_month_date,
  getMonthCapByCurrentMonthDate: state => state.current_month_caps.find(cap => cap.date === state.current_month_date),
  getShowCreateMonthCapModal: state => state.show_create_month_cap_modal,
  getShowUpdateMonthCapModal: state => state.show_update_month_cap_modal
}

const actions = {
  async createMonthCap ({ commit }, cap) {
    await axios.post('/month-cap/', cap)
      .then(response => {
        commit('UPDATE_MONTH_CAP', response.data)
      })
  },
  async updateMonthCap ({ commit }, cap) {
    await axios.put(`/month-cap/${cap.id}/`, cap)
      .then(response => {
        commit('UPDATE_MONTH_CAP', response.data)
      })
  }
}

const mutations = {
  SET_CURRENT_MONTH_CAPS: (state, caps) => (state.current_month_caps = caps),
  RESET_CURRENT_MONTH_CAPS: (state) => (state.current_month_caps = null),
  SET_CURRENT_MONTH_DATE: (state, month) => (state.current_month_date = month),
  SET_SELECTED_CAP_MONTH: (state, month) => (state.selected_cap_month = state.current_month_caps.find(cap => cap.date === month.date)),
  RESET_SELECTED_CAP_MONTH: (state) => (state.selected_cap_month = null),
  UPDATE_MONTH_CAP: (state, updatedCap) => {
    const index = state.current_month_caps.findIndex(cap => cap.date === updatedCap.date)
    if (index !== -1) {
      const capUpdate = state.current_month_caps[index]
      capUpdate.limit = updatedCap.limit
      capUpdate.id = updatedCap.id
      state.current_month_caps.splice(index, 1, capUpdate)
    }
  },
  SHOW_CREATE_MONTH_CAP_MODAL: (state) => (state.show_create_month_cap_modal = true),
  CLOSE_CREATE_MONTH_CAP_MODAL: (state) => (state.show_create_month_cap_modal = false),
  SHOW_UPDATE_MONTH_CAP_MODAL: (state) => (state.show_update_month_cap_modal = true),
  CLOSE_UPDATE_MONTH_CAP_MODAL: (state) => (state.show_update_month_cap_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
