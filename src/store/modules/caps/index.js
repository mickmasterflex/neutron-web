import axios from '@/axios'
import dayCaps from '@/store/modules/caps/day/index'
import monthCaps from '@/store/modules/caps/month/index'

const modules = {
  dayCaps,
  monthCaps
}

const state = {
  current_cap_parent: null,
  caps_calendar_endpoint: '',
  caps_calendar_params: '',
  show_caps_modal: false
}

const getters = {
  getCurrentCapParent: state => state.current_cap_parent,
  getCapsCalendarEndpoint: state => (state.caps_calendar_endpoint + state.caps_calendar_params),
  getShowCapsModal: state => (state.show_caps_modal)
}

const actions = {
  async fetchCurrentCaps ({ commit, getters }) {
    await axios.get(getters.getCapsCalendarEndpoint)
      .then(response => {
        commit('SET_CURRENT_CAP_PARENT', response.data.parent)
        commit('SET_CURRENT_DAY_CAPS', response.data.day_caps)
        commit('SET_CURRENT_MONTH_CAPS', response.data.month_caps)
      })
  }
}

const mutations = {
  SET_CURRENT_CAP_PARENT: (state, parent) => (state.current_cap_parent = parent),
  RESET_CURRENT_CAP_PARENT: (state) => (state.current_cap_parent = null),
  SET_CAPS_CALENDAR_ENDPOINT: (state, parent) => (state.caps_calendar_endpoint = `/caps-calendar/${parent.type}/${parent.id}/`),
  SET_CAPS_CALENDAR_PARAMS: (state, query) => (state.caps_calendar_params = '?months=' + query.months + '&date=' + query.date),
  RESET_CAPS_CALENDAR_ENDPOINT: (state) => (state.caps_calendar_endpoint = ''),
  RESET_CAPS_CALENDAR_PARAMS: (state) => (state.caps_calendar_params = ''),
  SHOW_CAPS_MODAL: (state) => (state.show_caps_modal = true),
  CLOSE_CAPS_PARENT_MODAL: (state) => (state.show_caps_modal = false)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
