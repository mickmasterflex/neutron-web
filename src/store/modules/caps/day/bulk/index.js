import visibility from './visibility'
import axios from '@/axios'

const modules = {
  visibility
}

const state = {
  bulk_update_day_caps: []
}

const getters = {
  getBulkUpdateDayCaps: state => state.bulk_update_day_caps,
  getBulkUpdateDayCapsWithIds: state => state.bulk_update_day_caps.filter(cap => cap.id)
}

const actions = {
  async bulkUpdateDayCaps ({ commit, dispatch }, caps) {
    commit('SET_CAPS_POST_LOADING')
    await axios.post('/day-cap-bulk/', caps)
      .then(response => {
        response.data.caps.forEach(cap => {
          commit('UPDATE_DAY_CAP', cap)
        })
        dispatch('updateCapsParent')
        commit('RESET_BULK_UPDATE_DAY_CAPS')
      }).finally(() => {
        commit('RESET_CAPS_POST_LOADING')
      })
  },
  async bulkDeleteDayCaps ({ commit, dispatch }, caps) {
    commit('SET_CAPS_DELETE_LOADING')
    await axios.delete('/day-cap-bulk/', { data: { caps } })
      .then(response => {
        response.data.caps.forEach(capId => {
          commit('REMOVE_DAY_CAP', capId)
        })
        dispatch('updateCapsParent')
        commit('RESET_BULK_UPDATE_DAY_CAPS')
      }).finally(() => {
        commit('RESET_CAPS_DELETE_LOADING')
      })
  }
}

const mutations = {
  ADD_DAY_TO_BULK_UPDATE_DAY_CAPS: (state, day) => (state.bulk_update_day_caps.push(day)),
  ADD_DAYS_TO_BULK_UPDATE_DAY_CAPS: (state, days) => (state.bulk_update_day_caps = [...new Set([...state.bulk_update_day_caps, ...days])]),
  REMOVE_DAYS_FROM_BULK_UPDATE_DAY_CAPS: (state, dates) => (state.bulk_update_day_caps = state.bulk_update_day_caps.filter(date => !dates.includes(date))),
  REMOVE_DAY_FROM_BULK_UPDATE_DAY_CAPS: (state, day) => (state.bulk_update_day_caps.splice(state.bulk_update_day_caps.indexOf(day), 1)),
  RESET_BULK_UPDATE_DAY_CAPS: (state) => (state.bulk_update_day_caps = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
