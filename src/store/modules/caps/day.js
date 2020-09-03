import axios from '@/axios'

const state = {
  current_day_caps: null,
  selected_cap_day: null,
  show_create_day_cap_modal: false,
  show_update_day_cap_modal: false
}

const getters = {
  getCurrentDayCaps: state => state.current_day_caps,
  getSelectedCapDay: state => state.selected_cap_day,
  getShowCreateDayCapModal: state => state.show_create_day_cap_modal,
  getShowUpdateDayCapModal: state => state.show_update_day_cap_modal
}

const actions = {
  async createDayCap ({ commit }, cap) {
    await axios.post('/day-cap/', cap)
      .then(response => {
        commit('ADD_DAY_CAP', response.data)
      })
  },
  async updateDayCap ({ commit }, cap) {
    await axios.put(`/day-cap/${cap.id}/`, cap)
      .then(response => {
        commit('UPDATE_DAY_CAP', response.data)
      })
  },
  async deleteDayCap ({ commit }, id) {
    await axios.delete(`/day-cap/${id}/`)
      .then(() => {
        commit('CLOSE_UPDATE_DAY_CAP_MODAL')
        commit('REMOVE_DAY_CAP', id)
      })
  }
}

const mutations = {
  SET_CURRENT_DAY_CAPS: (state, caps) => (state.current_day_caps = caps),
  RESET_CURRENT_DAY_CAPS: (state) => (state.current_day_caps = null),
  ADD_DAY_CAP: (state, cap) => state.current_day_caps.unshift(cap),
  UPDATE_DAY_CAP: (state, updatedCap) => {
    const index = state.current_day_caps.findIndex(cap => cap.id === updatedCap.id)
    if (index !== -1) {
      state.current_day_caps.splice(index, 1, updatedCap)
    }
  },
  REMOVE_DAY_CAP: (state, id) => (state.current_day_caps = state.current_day_caps.filter(cap => cap.id !== id)),
  SET_SELECTED_CAP_DAY: (state, day) => (state.selected_cap_day = day),
  RESET_SELECTED_CAP_DAY: (state) => (state.selected_cap_day = null),
  SHOW_CREATE_DAY_CAP_MODAL: (state) => (state.show_create_day_cap_modal = true),
  CLOSE_CREATE_DAY_CAP_MODAL: (state) => (state.show_create_day_cap_modal = false),
  SHOW_UPDATE_DAY_CAP_MODAL: (state) => (state.show_update_day_cap_modal = true),
  CLOSE_UPDATE_DAY_CAP_MODAL: (state) => (state.show_update_day_cap_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
