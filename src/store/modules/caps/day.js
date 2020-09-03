import axios from '@/axios'

const state = {
  current_day_caps: null,
  selected_cap_day: null,
  show_create_cap_modal: false,
  show_update_cap_modal: false
}

const getters = {
  getCurrentDayCaps: state => state.current_day_caps,
  getSelectedCapDay: state => state.selected_cap_day,
  getShowCreateCapModal: state => state.show_create_cap_modal,
  getShowUpdateCapModal: state => state.show_update_cap_modal
}

const actions = {
  async createDayCap ({ commit }, cap) {
    await axios.post('/day-cap/', cap)
      .then(response => {
        commit('ADD_DAY_CAP', response.data)
      }).catch(e => {
        window.console.log(e.data)
      })
  }
}

const mutations = {
  SET_CURRENT_DAY_CAPS: (state, caps) => (state.current_day_caps = caps),
  RESET_CURRENT_DAY_CAPS: (state) => (state.current_day_caps = null),
  ADD_DAY_CAP: (state, cap) => state.current_day_caps.unshift(cap),
  SET_SELECTED_CAP_DAY: (state, day) => (state.selected_cap_day = day),
  RESET_CURRENT_DAY_CAP_DAY: (state) => (state.selected_cap_day = null),
  SHOW_CREATE_CAP_MODAL: (state) => (state.show_create_cap_modal = true),
  CLOSE_CREATE_CAP_MODAL: (state) => (state.show_create_cap_modal = false),
  SHOW_UPDATE_CAP_MODAL: (state) => (state.show_update_cap_modal = true),
  CLOSE_UPDATE_CAP_MODAL: (state) => (state.show_update_cap_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
