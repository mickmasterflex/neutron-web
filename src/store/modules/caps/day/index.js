import axios from '@/axios'
import _unionBy from 'lodash/unionBy'
import dayCapModals from '@/store/modules/caps/day/visibility'
import bulkUpdate from '@/store/modules/caps/day/bulk'

const modules = {
  bulkUpdate,
  dayCapModals
}

const state = {
  current_day_caps: [],
  selected_cap_day: null
}

const getters = {
  getCurrentDayCaps: state => state.current_day_caps,
  getSelectedCapDay: state => state.selected_cap_day
}

const actions = {
  async createDayCap ({ commit, dispatch }, cap) {
    commit('SET_CAPS_POST_LOADING')
    await axios.post('/day-cap/', cap)
      .then(response => {
        commit('UPDATE_DAY_CAP', response.data)
        dispatch('updateCapsParent')
      }).finally(() => {
        commit('RESET_CAPS_POST_LOADING')
      })
  },
  async updateDayCap ({ commit, dispatch }, cap) {
    commit('SET_CAPS_PUT_LOADING')
    await axios.put(`/day-cap/${cap.id}/`, cap)
      .then(response => {
        commit('UPDATE_DAY_CAP', response.data)
        dispatch('updateCapsParent')
      }).finally(() => {
        commit('RESET_CAPS_PUT_LOADING')
      })
  },
  async deleteDayCap ({ commit, dispatch }, id) {
    commit('SET_CAPS_DELETE_LOADING')
    await axios.delete(`/day-cap/${id}/`)
      .then(() => {
        commit('CLOSE_UPDATE_DAY_CAP_MODAL')
        commit('REMOVE_DAY_CAP', id)
        dispatch('updateCapsParent')
      }).finally(() => {
        commit('RESET_CAPS_DELETE_LOADING')
      })
  }
}

const mutations = {
  ADD_CURRENT_DAY_CAPS: (state, caps) => (
    state.current_day_caps = _unionBy(state.current_day_caps, caps, 'date')
  ),
  RESET_CURRENT_DAY_CAPS: (state) => (state.current_day_caps = []),
  UPDATE_DAY_CAP: (state, updatedCap) => {
    const index = state.current_day_caps.findIndex(cap => cap.date === updatedCap.date)
    if (index !== -1) {
      const capUpdate = state.current_day_caps[index]
      capUpdate.limit = updatedCap.limit
      capUpdate.id = updatedCap.id
      state.current_day_caps.splice(index, 1, capUpdate)
    }
  },
  REMOVE_DAY_CAP: (state, id) => {
    const index = state.current_day_caps.findIndex(cap => cap.id === id)
    if (index !== -1) {
      const deletedCap = state.current_day_caps[index]
      deletedCap.id = null
      deletedCap.is_capped = false
      deletedCap.limit = null
      state.current_day_caps.splice(index, 1, deletedCap)
    }
  },
  SET_SELECTED_CAP_DAY: (state, day) => (state.selected_cap_day = day),
  RESET_SELECTED_CAP_DAY: (state) => (state.selected_cap_day = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
